# Docker API Service

REST API for managing Docker containers with start/stop capabilities.

## Features

- ✅ List all Docker containers
- ✅ Get container details
- ✅ Start container
- ✅ Stop container
- ✅ Restart container

## Installation

```bash
npm install
```

## Running

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server runs on: http://localhost:3001

## API Endpoints

### 1. Health Check
```
GET /health
```

Response:
```json
{
  "status": "ok",
  "message": "Docker API is running",
  "timestamp": "2026-01-29T..."
}
```

### 2. List All Containers
```
GET /api/containers
```

Response:
```json
{
  "success": true,
  "count": 2,
  "containers": [
    {
      "id": "e2d4ffd70022",
      "name": "my-postgres",
      "image": "postgres:16",
      "status": "running",
      "state": "Up 2 hours",
      "ports": [...],
      "created": "2026-01-23T..."
    }
  ]
}
```

### 3. Get Container Details
```
GET /api/containers/:name
```

Example:
```
GET /api/containers/my-postgres
```

### 4. Start Container
```
POST /api/containers/:name/start
```

Example:
```
POST /api/containers/my-postgres/start
```

Response:
```json
{
  "success": true,
  "message": "Container started successfully",
  "container": {
    "id": "e2d4ffd70022",
    "name": "my-postgres",
    "status": "running",
    "running": true,
    "startedAt": "2026-01-29T..."
  }
}
```

### 5. Stop Container
```
POST /api/containers/:name/stop
```

Example:
```
POST /api/containers/my-postgres/stop
```

Response:
```json
{
  "success": true,
  "message": "Container stopped successfully",
  "container": {
    "id": "e2d4ffd70022",
    "name": "my-postgres",
    "status": "exited",
    "running": false,
    "finishedAt": "2026-01-29T..."
  }
}
```

### 6. Restart Container
```
POST /api/containers/:name/restart
```

## Testing with Postman

Import the Postman collection from `postman_collection.json`

Or test manually:

```bash
# Health check
curl http://localhost:3001/health

# List containers
curl http://localhost:3001/api/containers

# Get container
curl http://localhost:3001/api/containers/my-postgres

# Start container
curl -X POST http://localhost:3001/api/containers/my-postgres/start

# Stop container
curl -X POST http://localhost:3001/api/containers/my-postgres/stop
```

## Requirements

- Node.js 20+
- Docker installed and running
- Access to Docker socket (`/var/run/docker.sock`)

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad request (e.g., container already running)
- `404` - Container not found
- `500` - Server error

## CORS

CORS is enabled for all origins. Configure in `src/index.js` if needed.
