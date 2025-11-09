# Minimal Docker CI/CD Demo

Node.js Express app with Docker CI/CD pipeline that builds and pushes to Docker Hub.

## Quick Start

```bash
# Local development
cd app
npm install
npm test
npm start

# Docker
docker build -t docker-ci-cd-demo .
docker run -p 8080:3000 docker-ci-cd-demo

# Docker Compose
IMAGE=docker-ci-cd-demo TAG=dev docker-compose up -d
```

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs on push to `main`:

1. **Build & Push**
   - Builds Docker image
   - Logs into Docker Hub
   - Tags image with `sha-<commit>` and `latest`
   - Pushes to Docker Hub

2. **Container Testing**
   - Runs the container
   - Tests both endpoints with curl
   - Validates `/healthz` returns correct JSON
   - Cleans up test container

**Setup**: Add these secrets in GitHub repository settings (Settings → Secrets and variables → Actions):
- `DOCKERHUB_USERNAME` - Your Docker Hub username
- `DOCKERHUB_TOKEN` - Docker Hub access token

**Note**: Pull requests trigger the workflow but don't run any jobs.

## Endpoints

- `GET /` - Returns greeting
- `GET /healthz` - Returns `{"status":"ok"}`

## Stack

- Node.js 20 Alpine
- Express.js
- GitHub Actions → Docker Hub

