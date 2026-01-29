# Backstage Learning Notes

Tài liệu tổng hợp quy trình chuẩn để setup và làm việc với Backstage.

---

## Ex1: Setup Backstage Application

**Ngày thực hiện:** 23/01/2026

### 1. Chuẩn bị môi trường

#### 1.1. Cài đặt Node.js và set default

```bash
# Cài đặt Node.js LTS mới nhất (Krypton - v24)
nvm install lts/krypton

# Set làm version mặc định
nvm alias default lts/krypton

# Thêm auto-load vào .bashrc để terminal mới tự động dùng Node v24
cat >> ~/.bashrc << 'EOF'

# Auto-use default Node version when opening new terminal
nvm use default --silent
EOF

# Reload bashrc
source ~/.bashrc

# Kiểm tra
node -v   # v24.13.0
npm -v    # v11.6.2
```

**✅ Môi trường:**
- **Node.js:** v24.13.0 (LTS Krypton)
- **npm:** v11.6.2

---

#### 1.2. Cài đặt Yarn

```bash
# Enable Corepack
corepack enable

# Kích hoạt Yarn 4.4.1
corepack prepare yarn@4.4.1 --activate

# Kiểm tra
yarn -v  # 4.4.1
```

**✅ Yarn version:** 4.4.1

---

### 2. Tạo Backstage Application

```bash
# Tạo app mới
npx @backstage/create-app@latest

# Nhập tên project khi được hỏi
? Enter a name for the app [required] hello

# Đợi quá trình cài đặt hoàn tất
# ✅ Successfully created hello
```

---

### 3. Cấu hình Node version cho project

```bash
# Di chuyển vào project
cd hello/

# Tạo file .nvmrc để lock Node version
echo "lts/krypton" > .nvmrc

# Từ giờ chỉ cần: nvm use (sẽ tự động đọc từ .nvmrc)
```

**⚠️ Note:** `npx @backstage/create-app@latest` tự động:
- ✅ Tạo Git repository
- ✅ Tạo initial commit
- ✅ Cấu hình Git user (mặc định: hung/hung@example.com)
- ✅ Tạo `.gitignore`

**Kiểm tra Git:**
```bash
cd hello/
git status          # Xem trạng thái
git log --oneline   # Xem commit history
```

---

---

### 4. Khởi động ứng dụng

```bash
# Di chuyển vào thư mục project
cd hello/

# Khởi động cả frontend và backend
yarn start

# ✅ Kết quả:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:7007
# - Cả 2 services đều running successfully
```

**Logs quan trọng khi start thành công:**
```
Starting app, backend
Loaded config from app-config.yaml
Rspack compiled successfully
rootHttpRouter info Listening on :7007
Plugin initialization complete
```

---

### 5. Cấu trúc thư mục Backstage

```
hello/
├── app-config.yaml              # Config chính
├── app-config.local.yaml        # Config local (không commit)
├── app-config.production.yaml   # Config production
├── backstage.json               # Metadata
├── catalog-info.yaml            # Software catalog
├── package.json                 # Root package
├── .nvmrc                       # Node version lock
│
├── examples/                    # Ví dụ entities
│   ├── entities.yaml
│   ├── org.yaml
│   └── template/
│
├── packages/
│   ├── app/                     # Frontend (React)
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   └── components/
│   │   └── public/
│   │
│   └── backend/                 # Backend (Node.js)
│       ├── src/
│       │   └── index.ts
│       └── Dockerfile
│
└── plugins/                     # Custom plugins
```

---

### 6. Các lệnh cơ bản

```bash
# Khởi động development (frontend + backend)
yarn start

# Build backend only
yarn build:backend

# Build tất cả packages
yarn build:all

# Run tests
yarn test
yarn test:all        # với coverage

# Run E2E tests
yarn test:e2e

# Lint và fix code
yarn lint:all
yarn fix

# Type checking
yarn tsc

# Clean build artifacts
yarn clean

# Build Docker image
yarn build-image

# Tạo plugin/package mới
yarn new
```

---

### 7. Xác nhận setup thành công

Truy cập http://localhost:3000 và kiểm tra:

✅ **Frontend loads successfully**
- Home page hiển thị
- Sidebar navigation hoạt động
- Guest authentication tự động

✅ **Backend responding**
- APIs return status 200
- Catalog entities loading
- Permission system working

✅ **Services trong log:**
```
Plugin initialization complete:
- app ✅
- auth ✅
- catalog ✅
- permission ✅
- proxy ✅
- scaffolder ✅
- search ✅
- techdocs ✅
```

---

---

### 8. Next Steps

**Đã hoàn thành Ex1 ✅**
- ✅ Setup Node.js v24 (default)
- ✅ Cài đặt Yarn 4.4.1
- ✅ Tạo Backstage app thành công
- ✅ Khởi động frontend + backend
- ✅ Xác nhận tất cả services hoạt động

**Bước tiếp theo để học:**

1. **Setup Software Catalog**
   - Đọc: https://backstage.io/docs/features/software-catalog/configuration
   - Import entities từ GitHub/GitLab
   - Tạo custom entity kinds

2. **Add Authentication**
   - Đọc: https://backstage.io/docs/auth/
   - Tích hợp GitHub OAuth
   - Cấu hình permissions

3. **Create Custom Plugin**
   - Đọc: https://backstage.io/docs/plugins/
   - Tạo plugin đầu tiên với `yarn new`
   - Tích hợp API của bạn

4. **Deploy to Production**
   - Build production image
   - Setup database (PostgreSQL)
   - Deploy với Docker/Kubernetes

---

### 9. Quick Reference

**Environment:**
```bash
Node: v24.13.0 (LTS Krypton)
Yarn: 4.4.1
Backstage: Latest
```

**Ports:**
```
Frontend: 3000
Backend: 7007
```

**Key Files:**
```
app-config.yaml          → Main configuration
app-config.local.yaml    → Local overrides (gitignored)
.nvmrc                   → Node version lock
```

**Quick Start (làm lại từ đầu):**
```bash
# 1. Setup environment (one-time)
nvm install lts/krypton
nvm alias default lts/krypton
echo 'nvm use default --silent' >> ~/.bashrc
corepack enable
corepack prepare yarn@4.4.1 --activate

# 2. Create app
npx @backstage/create-app@latest
# Enter name: [your-app-name]

# 3. Start
cd [your-app-name]
yarn start
# Open http://localhost:3000
```

---

### 10. Resources

- **Official Docs:** https://backstage.io/docs
- **GitHub:** https://github.com/backstage/backstage
- **Community:** https://discord.gg/backstage
- **Plugins Marketplace:** https://backstage.io/plugins
- **Release Notes:** https://backstage.io/docs/releases/

---

**Last updated:** 23/01/2026  
**Status:** Lab 1 Complete ✅

---

## Ex2: Tạo PostgreSQL Container Template

**Ngày thực hiện:** 23/01/2026

### Mục tiêu

Tạo Backstage Software Template để sinh ra Docker commands tạo PostgreSQL containers ở local.

**⚠️ Note:** Đây KHÔNG phải là setup PostgreSQL làm database cho Backstage. Đây là tạo template để user có thể tạo PostgreSQL containers cho các dự án khác.

---

### 1. Tạo Template Structure

```bash
# Tạo thư mục template
mkdir -p /home/tansang/Documents/Dev_DevOps/hello/templates/postgres-container
cd /home/tansang/Documents/Dev_DevOps/hello/templates/postgres-container
```

---

### 2. Tạo Template File

Tạo file `template.yaml`:

```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: postgres-container-template
  title: PostgreSQL Container Creator
  description: Create a PostgreSQL container using Docker
  tags:
    - docker
    - postgres
    - database
spec:
  owner: user:default/guest
  type: container
  
  parameters:
    - title: Container Configuration
      required:
        - containerName
        - postgresVersion
        - port
        - password
        - database
      properties:
        containerName:
          title: Container Name
          type: string
          description: Name for the PostgreSQL container
          default: my-postgres
        postgresVersion:
          title: PostgreSQL Version
          type: string
          description: PostgreSQL version to use
          enum:
            - '16'
            - '15'
            - '14'
            - '13'
          default: '16'
        port:
          title: Host Port
          type: number
          description: Port on host machine (maps to container port 5432)
          default: 5432
        password:
          title: PostgreSQL Password
          type: string
          description: Password for postgres user
          default: postgres
        database:
          title: Database Name
          type: string
          description: Name of the default database
          default: mydb

  steps:
    - id: show-docker-command
      name: Show Docker Command
      action: debug:log
      input:
        message: |
          PostgreSQL Container Setup Instructions:
          
          To create the container, run this command:
          
          docker run -d \
            --name ${{ parameters.containerName }} \
            -p ${{ parameters.port }}:5432 \
            -e POSTGRES_PASSWORD=${{ parameters.password }} \
            -e POSTGRES_DB=${{ parameters.database }} \
            --restart unless-stopped \
            postgres:${{ parameters.postgresVersion }}
          
          Connection details:
          - Host: localhost
          - Port: ${{ parameters.port }}
          - Database: ${{ parameters.database }}
          - User: postgres
          - Password: ${{ parameters.password }}

  output:
    text:
      - title: Docker Command
        content: |
          Run this command to create the PostgreSQL container:
          
          ```bash
          docker run -d \
            --name ${{ parameters.containerName }} \
            -p ${{ parameters.port }}:5432 \
            -e POSTGRES_PASSWORD=${{ parameters.password }} \
            -e POSTGRES_DB=${{ parameters.database }} \
            --restart unless-stopped \
            postgres:${{ parameters.postgresVersion }}
          ```
          
          Verify container is running:
          ```bash
          docker ps | grep ${{ parameters.containerName }}
          ```
      - title: Connection String
        content: |
          **Connection Details:**
          - Host: `localhost`
          - Port: `${{ parameters.port }}`
          - Database: `${{ parameters.database }}`
          - User: `postgres`
          - Password: `${{ parameters.password }}`
          
          **Connection String:**
          ```
          postgresql://postgres:${{ parameters.password }}@localhost:${{ parameters.port }}/${{ parameters.database }}
          ```
    links:
      - title: Container Info
        icon: catalog
        url: '#'
```

---

### 3. Đăng ký Template vào Backstage

Sửa file `app-config.yaml`:

```yaml
catalog:
  locations:
    # Existing locations...
    
    # Add PostgreSQL template
    - type: file
      target: ../../templates/postgres-container/template.yaml
      rules:
        - allow: [Template]
```

---

### 4. Restart Backstage

```bash
cd /home/tansang/Documents/Dev_DevOps/hello
yarn start
```

**✅ Xác nhận template loaded:**
```
catalog info Performing location refresh
catalog info Successfully loaded template postgres-container-template
```

---

### 5. Test Template

#### 5.1. Truy cập Template UI

1. Mở browser: http://localhost:3000/create
2. Tìm template **"PostgreSQL Container Creator"**
3. Click **"Choose"**

#### 5.2. Điền Form

- **Container Name:** `test-postgres`
- **PostgreSQL Version:** `16`
- **Host Port:** `5433` (tránh conflict nếu port 5432 đã dùng)
- **Password:** `mypassword`
- **Database Name:** `testdb`

Click **"Review"** → **"Create"**

#### 5.3. Copy và Run Docker Command

Template sẽ hiển thị Docker command, copy và chạy:

```bash
docker run -d \
  --name test-postgres \
  -p 5433:5432 \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=testdb \
  --restart unless-stopped \
  postgres:16
```

#### 5.4. Verify Container

```bash
# Check container đang chạy
docker ps | grep test-postgres

# Test kết nối
docker exec test-postgres psql -U postgres -d testdb -c "SELECT version();"
```

**✅ Expected output:**
```
PostgreSQL 16.11 (Debian 16.11-1.pgdg13+1)...
```

---

### 6. Test Multiple Containers

Tạo container thứ 2 với port khác:

```bash
docker run -d \
  --name test-postgres-2 \
  -p 5434:5432 \
  -e POSTGRES_PASSWORD=password2 \
  -e POSTGRES_DB=testdb2 \
  --restart unless-stopped \
  postgres:16
```

---

### 7. Cleanup

```bash
# Stop containers
docker stop test-postgres test-postgres-2

# Remove containers
docker rm test-postgres test-postgres-2

# Verify
docker ps -a | grep test-postgres
```

---

### 8. Template Features

**✅ What the template does:**
- ✅ Provides form for container configuration
- ✅ Validates inputs (required fields, enum values)
- ✅ Generates Docker run command with user's parameters
- ✅ Shows connection string for database clients
- ✅ Displays verification commands

**🔍 Implementation Approach: Option 1 (Manual Execution)**
- Template generates command → User copies → User runs in terminal
- **Pros:** Simple, secure, no custom backend code needed
- **Cons:** Not fully automated, requires manual step

**💡 Alternative: Option 2 (Auto Execution)**
- Would require custom scaffolder action to execute Docker commands
- More complex, needs backend module with new Backstage API
- Security concerns (giving Backstage Docker access)

---

### 9. Troubleshooting

#### Port Already in Use
```bash
# Error: port is already allocated
# Solution: Use different port (5433, 5434, etc.)
```

#### Container Name Conflict
```bash
# Error: container name already in use
# Solution:
docker rm <container-name>  # Or use different name
```

#### Can't Connect to Database
```bash
# Wait 5-10 seconds after starting (PostgreSQL needs init time)
# Check container logs:
docker logs <container-name>
```

---

**Lab 2 Status: ✅ COMPLETE**

- ✅ Template created at `templates/postgres-container/`
- ✅ Template registered in `app-config.yaml`
- ✅ Template loads in Backstage UI
- ✅ Form validates user inputs
- ✅ Docker command generated correctly
- ✅ Container created and running successfully
- ✅ PostgreSQL connection verified

**Implementation:** Option 1 (Manual command execution) - Simple and working! ✅

---

## Ex3: Software Catalog Setup

**Ngày thực hiện:** 23/01/2026

### Giới thiệu

Software Catalog là trung tâm của Backstage, nơi quản lý:
- **Components:** Microservices, libraries, websites, mobile apps
- **APIs:** REST, GraphQL, gRPC endpoints
- **Resources:** Databases, S3 buckets, queues
- **Systems:** Nhóm các components lại thành hệ thống lớn
- **Groups/Users:** Quản lý ownership và teams

---

### 1. Tạo Component Structure

#### 1.1. Tạo demo service với catalog-info.yaml

```bash
# Tạo thư mục cho demo service
mkdir -p /home/tansang/Documents/Dev_DevOps/hello/demo-services/backend-api
cd /home/tansang/Documents/Dev_DevOps/hello/demo-services/backend-api

# Tạo catalog-info.yaml
cat > catalog-info.yaml << 'EOF'
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: backend-api
  description: Backend API service cho demo application
  tags:
    - python
    - fastapi
    - backend
spec:
  type: service
  lifecycle: production
  owner: user:default/guest
EOF
```

---

### 2. Register Component vào Backstage

#### Cách 1: Qua UI (đơn giản nhất)

1. Push code lên Git:
   ```bash
   cd /home/tansang/Documents/Dev_DevOps/hello
   git add demo-services/
   git commit -m "Add backend-api component"
   git push
   ```

2. Mở browser: http://localhost:3000
3. Click **"Create..."** → **"Register Existing Component"**
4. Nhập GitHub raw URL của `catalog-info.yaml`
5. Click **"Analyze"** → **"Import"**

#### Cách 2: Thêm vào app-config.yaml (tự động load khi start)

Thêm vào file `hello/app-config.yaml`:

```yaml
catalog:
  locations:
    # ... existing locations ...
    
    # Demo backend API
    - type: file
      target: ../../demo-services/backend-api/catalog-info.yaml
```

**Restart Backstage:**
```bash
# Ctrl+C để stop, sau đó:
yarn start
```

---

### 3. Tạo System để nhóm Components

```bash
# Tạo system definition
cat > /home/tansang/Documents/Dev_DevOps/hello/demo-services/systems.yaml << 'EOF'
apiVersion: backstage.io/v1alpha1
kind: System
metadata:
  name: demo-system
  description: Demo system for learning Backstage
  tags:
    - demo
    - learning
spec:
  owner: user:default/guest
EOF
```

Update backend-api component để link với system:

```yaml
# Trong backend-api/catalog-info.yaml, thêm vào spec:
spec:
  type: service
  lifecycle: production
  owner: user:default/guest
  system: demo-system     # ← Thêm dòng này
```

---

### 4. Restart Backstage và xác nhận

```bash
# Stop Backstage
pkill -f 'yarn start'

# Start lại
cd /home/tansang/Documents/Dev_DevOps/hello
yarn start
```

**Đợi 30-60 giây** để Backstage khởi động và process entities.

---

### 5. Xem Catalog

**Truy cập:** http://localhost:3000/catalog

#### 5.1. Xem Component

1. Filter **Kind = Component**
2. Tìm `backend-api` trong danh sách
3. Click vào để xem chi tiết:
   - Description: "Backend API service cho demo application"
   - Owner: user:guest
   - Lifecycle: production
   - Tags: python, fastapi, backend

#### 5.2. Xem System

1. Filter **Kind = System**
2. Tìm `demo-system`
3. Click để xem chi tiết

#### 5.3. Filter và Search

**Filter options:**
- **Kind:** Component, System, API, Resource, Group, User
- **Owner:** guest, team names
- **Lifecycle:** experimental, production, deprecated
- **Tags:** python, backend, frontend...

**Search:** Gõ tên component trong search box

---

### 6. Cấu trúc Catalog Entity (tóm tắt)

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component                    # Loại entity
metadata:
  name: backend-api                # Tên unique
  description: Mô tả service       # Description
  tags:                            # Tags để filter
    - python
    - backend
spec:
  type: service                    # service, website, library
  lifecycle: production            # experimental, production, deprecated
  owner: user:default/guest        # Owner (user hoặc team)
  system: demo-system              # Thuộc system nào (optional)
```

**Các loại Entity:**
- **Component:** Services, libraries, websites
- **System:** Nhóm các components lại
- **API:** REST/GraphQL/gRPC endpoints
- **Resource:** Databases, queues, storage
- **Group:** Teams/departments
- **User:** Individual developers

---

### 7. Link Component với System (optional)

Để link `backend-api` với `demo-system`:

```bash
# Edit backend-api/catalog-info.yaml
# Thêm dòng system vào spec:
```

```yaml
spec:
  type: service
  lifecycle: production
  owner: user:default/guest
  system: demo-system     # ← Thêm dòng này
```

**Restart Backstage** để áp dụng thay đổi.

---

**Lab 3 Status: ✅ COMPLETE**

- ✅ Hiểu cấu trúc catalog entities (YAML format)
- ✅ Tạo Component với catalog-info.yaml
- ✅ Tạo System với systems.yaml
- ✅ Register entities vào Backstage qua app-config.yaml
- ✅ Browse và filter catalog với nhiều options
- ✅ Component `backend-api` hiển thị đầy đủ thông tin

**Kết quả:** Component `backend-api` đã xuất hiện trong Catalog với đầy đủ metadata (description, tags, owner, lifecycle)

**Next:** Lab 4 - TechDocs (Documentation) hoặc GitHub Integration

---

## Ex3: REST API for Docker Container Management

**Ngày thực hiện:** 29/01/2026

### Mục tiêu
Xây dựng REST API để quản lý Docker containers (start/stop/restart) và test được bằng Postman.

---

### 1. Technology Stack

#### Core Dependencies
```json
{
  "express": "^4.18.2",      // Web framework
  "dockerode": "^4.0.2",     // Docker SDK for Node.js
  "cors": "^2.8.5"           // CORS support for frontend
}
```

#### Dev Dependencies
```json
{
  "nodemon": "^3.0.2"        // Auto-reload during development
}
```

**Lý do chọn:**
- **Express**: Framework Node.js đơn giản, phổ biến
- **Dockerode**: Official Docker Engine API client
- **CORS**: Cần thiết cho Ex4 (frontend integration)
- **Nodemon**: Dev tool để auto-reload khi code thay đổi

---

### 2. Project Structure

```
docker-api/
├── src/
│   └── index.js              # Main API server
├── package.json              # Dependencies & scripts
├── README.md                 # API documentation
├── TEST_RESULTS.md           # Test documentation
├── postman_collection.json   # Postman collection
└── .gitignore                # Git ignore file
```

---

### 3. API Implementation

#### 3.1. Docker Connection

```javascript
const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
```

**Docker Socket:**
- **Path:** `/var/run/docker.sock`
- **Permission:** User phải trong group `docker`
- **Verify:** `groups | grep docker`

---

#### 3.2. API Endpoints Implemented

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/api/containers` | GET | List all containers |
| `/api/containers/:name` | GET | Get container details |
| `/api/containers/:name/start` | POST | Start container |
| `/api/containers/:name/stop` | POST | Stop container |
| `/api/containers/:name/restart` | POST | Restart container |

---

#### 3.3. Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Container started successfully",
  "container": {
    "id": "4f2ef612b49c",
    "name": "test-postgres",
    "status": "running",
    "running": true,
    "startedAt": "2026-01-29T03:18:45.929Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Container is already running",
  "message": "Container test-postgres is already running"
}
```

---

#### 3.4. Error Handling

**State Validation:**
- Starting already running container → 400 Bad Request
- Stopping already stopped container → 400 Bad Request
- Container not found → 500 with Docker error message

**Docker Errors:**
- Connection error → 500 with socket path info
- API error → 500 with Docker daemon error

---

### 4. Running the Server

#### 4.1. Install Dependencies

```bash
cd docker-api
npm install
```

#### 4.2. Development Mode

```bash
npm run dev
```

**Output:**
```
🚀 Docker API Server running on http://localhost:3001
📋 Available endpoints:
   GET  /health
   GET  /api/containers
   GET  /api/containers/:name
   POST /api/containers/:name/start
   POST /api/containers/:name/stop
   POST /api/containers/:name/restart
```

#### 4.3. Production Mode

```bash
npm start
```

#### 4.4. Background Mode (with nohup)

```bash
nohup node src/index.js > /tmp/docker-api.log 2>&1 &
```

**Check process:**
```bash
ps aux | grep "node.*index.js" | grep -v grep
```

**Stop server:**
```bash
pkill -f "node.*docker-api"
```

---

### 5. Testing with curl

#### 5.1. Health Check

```bash
curl http://localhost:3001/health
```

**Expected:**
```json
{
  "status": "ok",
  "message": "Docker API is running",
  "timestamp": "2026-01-29T03:17:53.946Z"
}
```

---

#### 5.2. List All Containers

```bash
curl http://localhost:3001/api/containers?all=true
```

**Expected:**
```json
{
  "success": true,
  "total": 5,
  "running": 1,
  "stopped": 4,
  "containers": [...]
}
```

---

#### 5.3. Get Container Details

```bash
curl http://localhost:3001/api/containers/test-postgres
```

---

#### 5.4. Stop Container

```bash
curl -X POST http://localhost:3001/api/containers/test-postgres/stop
```

**Verify:**
```bash
docker ps --filter name=test-postgres
# (empty - container stopped)
```

---

#### 5.5. Start Container

```bash
curl -X POST http://localhost:3001/api/containers/test-postgres/start
```

**Verify:**
```bash
docker ps --filter name=test-postgres
# test-postgres   Up 10 seconds
```

---

#### 5.6. Restart Container

```bash
curl -X POST http://localhost:3001/api/containers/test-postgres/restart
```

---

### 6. Testing with Postman

#### 6.1. Import Collection

1. Open Postman
2. Click **Import** button
3. Select `docker-api/postman_collection.json`
4. Collection "Docker Container API" imported

---

#### 6.2. Postman Collection Structure

```
Docker Container API/
├── Health Check (GET)
├── List All Containers (GET)
├── Get Container Details (GET)
├── Start Container (POST)
├── Stop Container (POST)
└── Restart Container (POST)
```

All requests pre-configured with `http://localhost:3001`

---

#### 6.3. Test Workflow in Postman

```
1. Health Check → Verify API running
2. List Containers → Find test container
3. Get Details → Check current state
4. Stop → Container stopped
5. Start → Container running
6. Restart → Container restarted
```

**Verify Results:**
- Check response JSON
- Verify `"success": true`
- Check container state changes

---

### 7. Test Results Summary

**Date:** 29/01/2026  
**Status:** ✅ **ALL TESTS PASSED**

| Test Case | Endpoint | Status |
|-----------|----------|--------|
| Health Check | `GET /health` | ✅ PASS |
| List Containers | `GET /api/containers` | ✅ PASS |
| Get Container | `GET /api/containers/:name` | ✅ PASS |
| Stop Container | `POST /api/containers/:name/stop` | ✅ PASS |
| Start Container | `POST /api/containers/:name/start` | ✅ PASS |
| Restart Container | `POST /api/containers/:name/restart` | ✅ PASS |
| Error: Already Running | `/api/containers/:name/start` | ✅ PASS |
| Error: Not Found | `/api/containers/:name/start` | ✅ PASS |

**Total:** 8/8 tests passed

**Test Container:** `test-postgres` (PostgreSQL 16 from Ex2 template)

**Detailed test results:** See `docker-api/TEST_RESULTS.md`

---

### 8. Ex3 Requirements Verification

#### ✅ Requirements Met

1. **Implement API start/stop docker container** ✅
   - Start endpoint: `POST /api/containers/:name/start`
   - Stop endpoint: `POST /api/containers/:name/stop`
   - **Bonus:** Restart endpoint implemented
   - **Bonus:** List & details endpoints for full management

2. **API testable with Postman** ✅
   - Postman collection: `postman_collection.json` ✅
   - All endpoints documented with examples
   - Import instructions provided
   - Tested successfully (all 8 test cases passed)

3. **Working with containers from Ex2** ✅
   - Tested with `test-postgres` (created from Ex2 template)
   - PostgreSQL 16 container on port 5433
   - Start/stop operations verified with Docker CLI

---

### 9. Key Learnings

#### 9.1. Docker API Integration
- **Dockerode library:** Official Node.js Docker SDK
- **Socket connection:** Direct communication via Unix socket
- **Container states:** Running, stopped, paused, restarting
- **Error handling:** Proper validation before operations

#### 9.2. REST API Best Practices
- **Consistent response format:** Always `{success, message, data/error}`
- **Proper HTTP status codes:** 200, 400, 404, 500
- **CORS enabled:** Ready for frontend integration
- **Endpoint naming:** RESTful conventions (/api/resource/:id/action)

#### 9.3. Testing Strategy
- **curl first:** Quick validation during development
- **Postman second:** Complete API testing & documentation
- **Error scenarios:** Test both success and failure cases
- **State verification:** Use Docker CLI to confirm changes

---

### 10. Common Issues & Solutions

#### Issue 1: Permission Denied on Docker Socket

**Error:**
```
Error: connect EACCES /var/run/docker.sock
```

**Solution:**
```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker  # Refresh groups
```

---

#### Issue 2: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution:**
```bash
# Find and kill process using port 3001
lsof -ti:3001 | xargs kill -9
```

---

#### Issue 3: Container Name Not Found

**Error:**
```json
{
  "success": false,
  "error": "Failed to start container",
  "message": "(HTTP code 404) no such container"
}
```

**Solution:**
- Check container name with `docker ps -a`
- Container names are case-sensitive
- Use exact name (e.g., `test-postgres`, not `test_postgres`)

---

**Ex3 Status: ✅ COMPLETE**

- ✅ REST API implemented with Express & Dockerode
- ✅ 6 endpoints: health, list, details, start, stop, restart
- ✅ Postman collection created and working
- ✅ All 8 test cases passed
- ✅ Error handling for all scenarios
- ✅ CORS enabled for frontend integration
- ✅ Tested with Ex2 containers (test-postgres)

**Next:** Ex4 - Integrate API into Backstage Frontend

---
