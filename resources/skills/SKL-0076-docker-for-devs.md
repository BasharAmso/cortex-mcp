---
id: SKL-0076
name: Docker for Devs
category: skills
tags: [docker, containers, dockerfile, docker-compose, devops, local-dev, multi-stage-build]
capabilities: [dockerfile-authoring, compose-orchestration, container-debugging, image-optimization]
useWhen:
  - containerizing an app for the first time
  - setting up docker-compose for local development with multiple services
  - optimizing Docker image size with multi-stage builds
  - debugging a container that won't start or behaves differently from local
estimatedTokens: 700
relatedFragments: [PAT-0010, SKL-0018, SKL-0006]
dependencies: []
synonyms: ["how do I dockerize my app", "set up docker compose", "my container keeps crashing", "make my docker image smaller", "run my app in a container"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Docker for Devs

Containerize your app for consistent local dev and painless deployment. No Kubernetes, no orchestration complexity. Just Docker doing what Docker does best.

## Dockerfile Best Practices

Start from the right base image. Use official slim variants.

```dockerfile
# Good: specific version, slim variant
FROM node:20-slim AS base

# Bad: latest tag, full image
FROM node:latest
```

**Layer ordering matters.** Put things that change least at the top:

1. Base image and system deps
2. Package manager files (package.json, lock file)
3. Install dependencies
4. Copy source code
5. Build step

This maximizes layer caching. Dependency install only reruns when lock files change.

## Multi-Stage Builds

Keep production images small by separating build from runtime:

```dockerfile
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-slim AS runtime
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

Builder stage has dev deps and build tools. Runtime stage has only what's needed to run.

## Docker Compose for Local Dev

One file to spin up your entire stack:

```yaml
services:
  app:
    build: .
    ports: ["3000:3000"]
    volumes:
      - .:/app
      - /app/node_modules
    env_file: .env
    depends_on: [db, redis]

  db:
    image: postgres:16
    volumes: [pgdata:/var/lib/postgresql/data]
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: localdev

  redis:
    image: redis:7-alpine

volumes:
  pgdata:
```

**Key patterns:**
- Mount source code as volume for hot reload
- Exclude node_modules from volume mount (the `/app/node_modules` line)
- Use `depends_on` for startup order
- Named volumes for database persistence

## Debugging Containers

| Problem | Command |
|---------|---------|
| See logs | `docker compose logs -f app` |
| Shell into running container | `docker compose exec app sh` |
| Shell into failed container | `docker run -it --entrypoint sh <image>` |
| Check what's in the image | `docker history <image>` |
| Container keeps restarting | Check exit code with `docker inspect` |

## Key Rules

- Never put secrets in Dockerfiles or docker-compose.yml
- Always use `.dockerignore` (exclude node_modules, .git, .env)
- Pin image versions, never use `latest` in production
- Use `npm ci` not `npm install` in containers
- One process per container
