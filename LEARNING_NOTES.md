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

## Ex2: Setup PostgreSQL Database

**Ngày thực hiện:** 23/01/2026

### 1. Cài đặt PostgreSQL

```bash
# Update package list
sudo apt update

# Cài đặt PostgreSQL 16
sudo apt install postgresql postgresql-contrib -y

# Kiểm tra service đã chạy
systemctl is-active postgresql  # Output: active
```

**✅ PostgreSQL 16 installed**

---

### 2. Tạo Database và User

```bash
# Tạo user 'backstage' với password 'backstage'
sudo -u postgres psql -c "CREATE USER backstage WITH PASSWORD 'backstage';"

# Tạo database 'backstage' owned by user 'backstage'
sudo -u postgres psql -c "CREATE DATABASE backstage OWNER backstage;"

# Grant quyền
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE backstage TO backstage;"

# Grant SUPERUSER (cần cho migrations)
sudo -u postgres psql -c "ALTER USER backstage WITH SUPERUSER;"
```

**✅ Database credentials:**
- Database: `backstage`
- User: `backstage`
- Password: `backstage`
- Host: `localhost`
- Port: `5432`

---

### 3. Test kết nối

```bash
# Test connection
PGPASSWORD=backstage psql -U backstage -h localhost -d backstage -c "SELECT version();"

# Kết quả: PostgreSQL 16.11 (Ubuntu...)
# Bấm 'q' để thoát
```

---

### 4. Cài đặt PostgreSQL driver cho Backstage

```bash
cd hello/

# Install pg driver
yarn workspace backend add pg
```

---

### 5. Cấu hình Backstage

Sửa file `app-config.yaml`:

```yaml
backend:
  # ... (giữ nguyên phần trên)
  
  # PostgreSQL configuration
  database:
    client: pg
    connection:
      host: localhost
      port: 5432
      user: backstage
      password: backstage
      database: backstage
```

**Thay thế:**
```yaml
# Xóa config cũ:
database:
  client: better-sqlite3
  connection: ':memory:'
```

---

### 6. Khởi động Backstage với PostgreSQL

```bash
cd hello/
yarn start
```

**✅ Xác nhận thành công trong logs:**
```
catalog info Performing database migration
Plugin initialization complete
```

---

### 7. Xác minh data trong PostgreSQL

```bash
# Xem các tables đã được tạo
PGPASSWORD=backstage psql -U backstage -h localhost -d backstage -c "\dt"

# Sẽ thấy nhiều tables:
# - final_entities
# - refresh_state_references  
# - search
# - (và nhiều tables khác của các plugins)
```

---

### 8. So sánh với SQLite

| Feature | SQLite (default) | PostgreSQL |
|---------|------------------|------------|
| **Storage** | In-memory | Persistent disk |
| **Production** | ❌ Not recommended | ✅ Recommended |
| **Data retention** | Lost on restart | ✅ Persistent |
| **Performance** | Limited | ✅ Better for scale |
| **Multi-user** | Limited | ✅ Full support |

---

**Lab 2 Status: ✅ COMPLETE**

- ✅ PostgreSQL 16 installed
- ✅ Database và user created  
- ✅ Backstage config updated
- ✅ Database migrations successful
- ✅ Data persisted trong PostgreSQL

---
