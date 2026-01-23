# 📋 Bài Tập DevOps - Backstage & Docker API

> **Ngày thực hiện:** 23/01/2026

---

## 🎯 Đề Bài Gốc

```
Ex1: Setup Backstage ở local
Ex2: Tạo Postgres template để tạo ra 1 container postgres ở local
Ex3: Implement API start/stop docker container (phải test đc API bằng Postman)
Ex4: Tích hợp API start/stop docker container vào FE để quản lý App được tạo ra từ Postgres template (optional)
```

---

## 📚 Phần 1: Tổng Hợp Lý Thuyết

### 1.1. Backstage - Internal Developer Portal

**Backstage** là một open-source platform được phát triển bởi Spotify, cho phép xây dựng Internal Developer Portal (IDP) để quản lý và chuẩn hóa quy trình phát triển phần mềm trong tổ chức.

#### Kiến trúc Backstage:
- **Frontend (React)**: Giao diện người dùng chạy trên port `3000`
- **Backend (Node.js)**: API server chạy trên port `7007`
- **Software Catalog**: Quản lý các component, service trong hệ thống
- **Software Templates (Scaffolder)**: Tự động hóa việc tạo project mới
- **TechDocs**: Tài liệu kỹ thuật tích hợp
- **Plugins**: Mở rộng chức năng

#### Yêu cầu hệ thống:
| Công cụ | Phiên bản yêu cầu |
|---------|-------------------|
| Node.js | LTS version (20.x hoặc mới hơn) |
| Yarn | 4.4.1+ |
| Git | Phiên bản mới nhất |
| Docker | Optional (khuyến nghị) |
| RAM | Tối thiểu 6GB |
| Disk | Tối thiểu 20GB |

#### Tài liệu tham khảo:
- 🔗 [Official Backstage Docs](https://backstage.io/docs)
- 🔗 [Getting Started Guide](https://backstage.io/docs/getting-started/)
- 🔗 [Software Templates Tutorial](https://backstage.io/docs/features/software-templates/)
- 🔗 [KodeKloud Backstage Tutorial](https://kodekloud.com/blog/backstage-tutorial/)

---

### 1.2. Backstage Software Templates

**Software Templates** là tính năng cho phép tự động hóa việc tạo các component mới theo chuẩn của tổ chức.

#### Cấu trúc Template (`template.yaml`):
```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: my-template
  title: My Template
  description: Template description
spec:
  owner: team-name
  type: service
  parameters:
    # Input fields từ user
  steps:
    # Actions thực thi
  output:
    # Links/info sau khi tạo
```

#### Các Scaffolder Actions phổ biến:
| Action | Mô tả |
|--------|-------|
| `fetch:template` | Fetch và render template repository |
| `publish:github` | Push code lên GitHub |
| `catalog:register` | Đăng ký component vào catalog |
| `debug:log` | In log để debug |

#### Tài liệu tham khảo:
- 🔗 [Writing Templates](https://backstage.io/docs/features/software-templates/writing-templates)
- 🔗 [Built-in Actions](https://backstage.io/docs/features/software-templates/builtin-actions)
- 🔗 [Template Examples](https://github.com/backstage/software-templates)

---

### 1.3. Docker Engine API

**Docker Engine API** là RESTful API cho phép tương tác với Docker daemon thông qua HTTP requests.

#### Cách expose Docker API:
```bash
# Thêm vào /etc/docker/daemon.json
{
  "hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2375"]
}

# Hoặc sửa systemd service
sudo systemctl edit docker.service
# Thêm: ExecStart=/usr/bin/dockerd -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375

# Restart Docker
sudo systemctl daemon-reload
sudo systemctl restart docker
```

> ⚠️ **Cảnh báo bảo mật**: Expose Docker API không nên dùng trong production nếu không có TLS/authentication.

#### Các API Endpoints chính:
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/containers/json` | Liệt kê containers |
| `POST` | `/containers/create` | Tạo container mới |
| `POST` | `/containers/{id}/start` | Start container |
| `POST` | `/containers/{id}/stop` | Stop container |
| `DELETE` | `/containers/{id}` | Xóa container |
| `GET` | `/containers/{id}/json` | Chi tiết container |

#### Ví dụ sử dụng curl:
```bash
# Liệt kê tất cả containers
curl -X GET http://localhost:2375/v1.41/containers/json?all=true

# Start container
curl -X POST http://localhost:2375/v1.41/containers/{container_id}/start

# Stop container
curl -X POST http://localhost:2375/v1.41/containers/{container_id}/stop
```

#### Tài liệu tham khảo:
- 🔗 [Docker Engine API Reference](https://docs.docker.com/engine/api/)
- 🔗 [API v1.41 Documentation](https://docs.docker.com/engine/api/v1.41/)
- 🔗 [GeeksforGeeks Docker API Tutorial](https://www.geeksforgeeks.org/docker-engine-api/)

---

## 📝 Phần 2: Chi Tiết Yêu Cầu & Định Hướng Thực Hiện

### Ex1: Setup Backstage ở Local

#### 🎯 Yêu cầu:
Cài đặt và chạy Backstage developer portal tại môi trường local thành công.

#### 📋 Định hướng thực hiện:

**Bước 1: Chuẩn bị môi trường**
```bash
# Cài đặt Node.js LTS (khuyến nghị dùng nvm)
nvm install --lts
nvm use --lts

# Cài đặt Yarn (nếu chưa có)
npm install -g yarn

# Verify versions
node -v
yarn -v
```

**Bước 2: Tạo Backstage app**
```bash
# Tạo app mới
npx @backstage/create-app@latest

# Nhập tên app khi được hỏi (vd: my-backstage)
```

**Bước 3: Chạy ứng dụng**
```bash
cd my-backstage
yarn install
yarn dev
```

**Bước 4: Kiểm tra**
- Frontend: http://localhost:3000
- Backend: http://localhost:7007

#### ✅ Tiêu chí hoàn thành:
- [ ] Backstage chạy thành công trên local
- [ ] Truy cập được giao diện tại `localhost:3000`
- [ ] Có thể browse Software Catalog

---

### Ex2: Tạo Postgres Template

#### 🎯 Yêu cầu:
Tạo một Software Template trong Backstage để tự động tạo ra một container PostgreSQL chạy tại local.

#### 📋 Định hướng thực hiện:

**Bước 1: Tạo cấu trúc template**
```
templates/
└── postgres-template/
    ├── template.yaml           # Định nghĩa template
    └── skeleton/
        └── docker-compose.yaml # Template cho Postgres
```

**Bước 2: Viết template.yaml**
```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: postgres-container
  title: PostgreSQL Container
  description: Tạo một PostgreSQL container chạy local
spec:
  owner: user:guest
  type: database
  parameters:
    - title: Database Configuration
      required:
        - name
        - port
        - password
      properties:
        name:
          title: Container Name
          type: string
          description: Tên của Postgres container
        port:
          title: Port
          type: number
          default: 5432
          description: Port expose ra ngoài
        password:
          title: Password
          type: string
          ui:widget: password
          description: Password cho user postgres
  steps:
    - id: fetch-template
      name: Fetch Template
      action: fetch:template
      input:
        url: ./skeleton
        values:
          name: ${{ parameters.name }}
          port: ${{ parameters.port }}
          password: ${{ parameters.password }}
    - id: run-docker
      name: Run Docker Container
      action: # Custom action hoặc shell command
  output:
    links:
      - title: Container Info
        url: http://localhost:${{ parameters.port }}
```

**Bước 3: Đăng ký template vào Backstage**
- Thêm path template vào `app-config.yaml`:
```yaml
catalog:
  locations:
    - type: file
      target: ../../templates/postgres-template/template.yaml
```

**Bước 4: Test template**
- Truy cập `/create` trong Backstage
- Chọn template và điền thông tin
- Verify container được tạo

#### ✅ Tiêu chí hoàn thành:
- [ ] Template hiển thị trong `/create` page
- [ ] Có thể điền form parameters
- [ ] Postgres container được tạo và chạy thành công
- [ ] Có thể connect được vào database

---

### Ex3: Implement API Start/Stop Docker Container

#### 🎯 Yêu cầu:
Xây dựng REST API để start/stop Docker containers, có thể test được bằng Postman.

#### 📋 Định hướng thực hiện:

**Bước 1: Setup project backend (Node.js/Express hoặc Python/Flask)**

Option A - Node.js:
```bash
mkdir docker-api
cd docker-api
npm init -y
npm install express dockerode cors
```

Option B - Python:
```bash
mkdir docker-api
cd docker-api
pip install flask docker flask-cors
```

**Bước 2: Implement API endpoints**

Node.js Example:
```javascript
const express = require('express');
const Docker = require('dockerode');
const cors = require('cors');

const app = express();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

app.use(cors());
app.use(express.json());

// List containers
app.get('/api/containers', async (req, res) => {
  const containers = await docker.listContainers({ all: true });
  res.json(containers);
});

// Start container
app.post('/api/containers/:id/start', async (req, res) => {
  const container = docker.getContainer(req.params.id);
  await container.start();
  res.json({ message: 'Container started' });
});

// Stop container
app.post('/api/containers/:id/stop', async (req, res) => {
  const container = docker.getContainer(req.params.id);
  await container.stop();
  res.json({ message: 'Container stopped' });
});

app.listen(3001, () => console.log('API running on port 3001'));
```

**Bước 3: Test với Postman**

| Method | Endpoint | Body |
|--------|----------|------|
| GET | `http://localhost:3001/api/containers` | - |
| POST | `http://localhost:3001/api/containers/{id}/start` | - |
| POST | `http://localhost:3001/api/containers/{id}/stop` | - |

#### ✅ Tiêu chí hoàn thành:
- [ ] API server chạy thành công
- [ ] GET `/containers` trả về danh sách containers
- [ ] POST `/containers/{id}/start` start được container
- [ ] POST `/containers/{id}/stop` stop được container
- [ ] Tất cả endpoints test được qua Postman

---

### Ex4: Tích Hợp API Vào Frontend (Optional)

#### 🎯 Yêu cầu:
Xây dựng giao diện Frontend để quản lý các containers PostgreSQL được tạo từ template, sử dụng API đã implement ở Ex3.

#### 📋 Định hướng thực hiện:

**Bước 1: Xác định approach**
- **Option A**: Tạo plugin mới trong Backstage
- **Option B**: Tạo standalone React app

**Bước 2: Thiết kế UI components**
```
Components:
├── ContainerList       # Danh sách containers
├── ContainerCard       # Card hiển thị từng container
│   ├── Status badge    # Running/Stopped
│   ├── Start button
│   └── Stop button
└── CreateContainer     # Form tạo mới (link đến template)
```

**Bước 3: Implement với React**
```jsx
// Pseudo code for ContainerCard
function ContainerCard({ container }) {
  const handleStart = () => fetch(`/api/containers/${container.Id}/start`, { method: 'POST' });
  const handleStop = () => fetch(`/api/containers/${container.Id}/stop`, { method: 'POST' });
  
  return (
    <Card>
      <h3>{container.Names[0]}</h3>
      <Badge status={container.State} />
      <Button onClick={handleStart}>Start</Button>
      <Button onClick={handleStop}>Stop</Button>
    </Card>
  );
}
```

**Bước 4: Tích hợp vào Backstage (nếu chọn Option A)**
- Tạo plugin mới: `yarn new --select plugin`
- Implement API client
- Tạo components và routes

#### ✅ Tiêu chí hoàn thành:
- [ ] Giao diện hiển thị danh sách containers
- [ ] Có thể Start/Stop container từ UI
- [ ] Trạng thái container được cập nhật realtime
- [ ] (Bonus) Tích hợp được vào Backstage như plugin

---

## 🗓️ Thứ Tự Thực Hiện Đề Xuất

```
1. Ex1 (Setup Backstage) ─────► 2. Ex2 (Postgres Template)
                                         │
                                         ▼
4. Ex4 (Frontend - Optional) ◄──── 3. Ex3 (Docker API)
```

| # | Bài tập | Độ ưu tiên | Thời gian ước tính |
|---|---------|------------|-------------------|
| 1 | Setup Backstage | 🔴 Cao | 30-60 phút |
| 2 | Postgres Template | 🔴 Cao | 1-2 giờ |
| 3 | Docker API | 🔴 Cao | 1-2 giờ |
| 4 | Frontend Integration | 🟡 Thấp | 2-3 giờ |

---

## 📖 Tài Liệu Bổ Sung

### Backstage
- [Backstage GitHub Repository](https://github.com/backstage/backstage)
- [Backstage Community Plugins](https://backstage.io/plugins)
- [Roadie Backstage Tutorials](https://roadie.io/backstage/)

### Docker
- [Dockerode npm package](https://www.npmjs.com/package/dockerode)
- [Docker SDK for Python](https://docker-py.readthedocs.io/)
- [Docker Compose Reference](https://docs.docker.com/compose/)

### API Development
- [Express.js Documentation](https://expressjs.com/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Postman Learning Center](https://learning.postman.com/)