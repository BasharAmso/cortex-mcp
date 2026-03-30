---
id: SKL-0076
name: Docker for Devs
category: skills
tags: [docker, containers, dockerfile, docker-compose, devops, local-dev, multi-stage-build, hadolint, buildkit]
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
sourceUrl: "https://github.com/veggiemonk/awesome-docker"
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Docker for Devs

Containerize your app for consistent local dev and painless deployment. No Kubernetes, no orchestration complexity. Just Docker doing what Docker does best.

## Dockerfile Best Practices

Start from the right base image. Use official slim or distroless variants for smaller, more secure images.

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

This maximizes layer caching. Lint Dockerfiles with **Hadolint** to catch common mistakes and bash anti-patterns in RUN instructions.

## Multi-Stage Builds

Separate build from runtime to keep production images small:

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

Builder stage has dev deps and build tools. Runtime stage has only what is needed to run. Consider **distroless** images for even smaller attack surfaces.

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
- Enable **BuildKit** (`DOCKER_BUILDKIT=1`) for concurrent, cache-efficient builds

## Performance on Mac/Windows

File syncing in Docker Desktop can be slow. Options:
- Use Docker's built-in VirtioFS file sharing (default in recent versions)
- Try **docker-sync** for 50-70x faster shared code on older setups
- Keep node_modules inside the container, not on the host volume

## Debugging Containers

| Problem | Command |
|---------|---------|
| See logs | `docker compose logs -f app` |
| Shell into running container | `docker compose exec app sh` |
| Shell into failed container | `docker run -it --entrypoint sh <image>` |
| Check what's in the image | `docker history <image>` |
| Container keeps restarting | Check exit code with `docker inspect` |

## Key Constraints

- Never put secrets in Dockerfiles or docker-compose.yml
- Always use `.dockerignore` (exclude node_modules, .git, .env)
- Pin image versions, never use `latest` in production
- Use `npm ci` not `npm install` in containers (deterministic installs)
- One process per container
