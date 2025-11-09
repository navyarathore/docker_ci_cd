# Minimal Docker CI/CD Demo

Tiny Node.js Express app with one health endpoint and a lean CI/CD:
- Test with Jest
- Build & push image to GHCR
- Deploy using a single `docker-compose.yml`

## Local Usage
```bash
# Install & test
cd app
npm install
npm test

# Run locally without Docker
npm start

# Or with Docker (build then run)
docker build -t docker-ci-cd-demo .
docker run -p 8080:3000 docker-ci-cd-demo
```
Visit: http://localhost:8080

## Compose (optional)
If you've built or pushed an image, you can run it via compose:
```bash
# using a locally built image
IMAGE=docker-ci-cd-demo TAG=latest docker compose up -d

# or using GHCR image (replace owner/repo and tag)
IMAGE=ghcr.io/<owner>/<repo> TAG=<sha-or-latest> docker compose up -d
```

## CI/CD Summary
On push / PR: tests run.
On push: image built & pushed `ghcr.io/<owner>/<repo>:<sha>` (and `:latest` on main). Deploy job pulls and runs `docker compose up -d` on self-hosted runner.

## Setup
1. Enable Actions write permissions (Repo Settings → Actions).
2. Self-hosted runner: Docker + access to GHCR.
3. No extra secrets needed (uses `GITHUB_TOKEN`).

## Endpoints
- `/` greeting
- `/healthz` returns `{"status":"ok"}`

## Simplification Notes
- Single compose file used for both local + deploy.
- Dockerfile is one stage; only prod deps installed.
- Remove Express/Jest if you want even smaller (replace with native `http` and manual test).

