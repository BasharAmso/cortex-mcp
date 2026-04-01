---
id: EX-0043
name: Go API Server Pattern
category: examples
tags: [go, golang, api, http, server, middleware, graceful-shutdown, structured-logging, rest]
capabilities: [http-server, middleware-chain, graceful-shutdown, structured-logging]
useWhen:
  - building an idiomatic Go HTTP API server
  - implementing middleware chains with logging and recovery
  - setting up graceful shutdown for a Go service
estimatedTokens: 620
relatedFragments: [SKL-0132, PAT-0207]
dependencies: []
synonyms: ["go http server", "golang REST API", "go middleware pattern", "go web server boilerplate", "idiomatic go api"]
sourceUrl: "https://github.com/go-chi/chi"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "language"
---

# Go API Server Pattern

Idiomatic Go HTTP server with middleware chain, graceful shutdown, and structured JSON logging.

## Implementation

```go
package main

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

// --- Structured Logger ---
func newLogger() *slog.Logger {
	return slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))
}

// --- Middleware ---
type Middleware func(http.Handler) http.Handler

func chain(h http.Handler, middlewares ...Middleware) http.Handler {
	for i := len(middlewares) - 1; i >= 0; i-- {
		h = middlewares[i](h)
	}
	return h
}

func loggingMiddleware(logger *slog.Logger) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			next.ServeHTTP(w, r)
			logger.Info("request",
				"method", r.Method,
				"path", r.URL.Path,
				"duration_ms", time.Since(start).Milliseconds(),
				"remote", r.RemoteAddr,
			)
		})
	}
}

func recoveryMiddleware(logger *slog.Logger) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if err := recover(); err != nil {
					logger.Error("panic recovered", "error", err, "path", r.URL.Path)
					http.Error(w, `{"error":"internal server error"}`, http.StatusInternalServerError)
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// --- Handlers ---
type HealthResponse struct {
	Status string `json:"status"`
	Uptime string `json:"uptime"`
}

func healthHandler(startTime time.Time) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(HealthResponse{
			Status: "ok",
			Uptime: time.Since(startTime).String(),
		})
	}
}

// --- Server with Graceful Shutdown ---
func main() {
	logger := newLogger()
	startTime := time.Now()

	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", healthHandler(startTime))

	handler := chain(mux,
		recoveryMiddleware(logger),
		loggingMiddleware(logger),
		corsMiddleware,
	)

	srv := &http.Server{
		Addr:         ":8080",
		Handler:      handler,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in goroutine
	go func() {
		logger.Info("server starting", "addr", srv.Addr)
		if err := srv.ListenAndServe(); err != http.ErrServerClosed {
			logger.Error("server error", "error", err)
			os.Exit(1)
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	// Graceful shutdown with 30s deadline
	logger.Info("shutting down server")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Error("shutdown error", "error", err)
	}
	logger.Info("server stopped")
}
```

## Key Patterns

- **Middleware chain**: composable `func(http.Handler) http.Handler` applied in reverse order
- **Graceful shutdown**: catches SIGINT/SIGTERM, drains connections with a 30s deadline
- **Structured logging**: `slog.Logger` with JSON output for machine-parseable logs
- **Panic recovery**: middleware catches panics and returns 500 without crashing the process
