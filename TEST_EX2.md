# Ex2 - Test PostgreSQL Container Template

## Hướng Dẫn Test Chi Tiết

### 1. Truy Cập Template
1. Mở browser: `http://localhost:3000/create`
2. Tìm template **"PostgreSQL Container Creator"**
3. Click **"Choose"**

### 2. Điền Thông Tin
Điền form với các giá trị:
- **Container Name**: `test-postgres` 
- **PostgreSQL Version**: `16`
- **Host Port**: `5433` (tránh conflict với port 5432 nếu đã có)
- **Password**: `mypassword`
- **Database Name**: `testdb`

Click **"Review"** → **"Create"**

### 3. Copy Docker Command
Sau khi template hoàn thành, copy command từ output, ví dụ:
```bash
docker run -d \
  --name test-postgres \
  -p 5433:5432 \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=testdb \
  --restart unless-stopped \
  postgres:16
```

### 4. Chạy Docker Command
Paste command vào terminal và chạy:
```bash
docker run -d \
  --name test-postgres \
  -p 5433:5432 \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=testdb \
  --restart unless-stopped \
  postgres:16
```

Expected output: Container ID (string dài)
```
a1b2c3d4e5f6...
```

### 5. Verify Container Status
Kiểm tra container đã chạy:
```bash
docker ps | grep test-postgres
```

Expected output:
```
a1b2c3d4e5f6   postgres:16   "docker-entrypoint.s…"   10 seconds ago   Up 9 seconds   0.0.0.0:5433->5432/tcp   test-postgres
```

### 6. Test Kết Nối PostgreSQL

#### Option A: Dùng Docker Exec
```bash
docker exec -it test-postgres psql -U postgres -d testdb
```

Sau khi vào psql prompt, chạy test queries:
```sql
-- List databases
\l

-- List tables (should be empty)
\dt

-- Create test table
CREATE TABLE test (id SERIAL PRIMARY KEY, name VARCHAR(50));

-- Insert data
INSERT INTO test (name) VALUES ('Hello from Backstage!');

-- Query data
SELECT * FROM test;

-- Exit
\q
```

#### Option B: Dùng psql Client (nếu đã cài)
```bash
psql -h localhost -p 5433 -U postgres -d testdb
# Password: mypassword
```

#### Option C: Dùng DBeaver/pgAdmin
- Host: `localhost`
- Port: `5433`
- Database: `testdb`
- Username: `postgres`
- Password: `mypassword`

### 7. Test Tạo Multiple Containers
Thử tạo container thứ 2 với tên khác:
- Quay lại `http://localhost:3000/create`
- Chọn template lại
- Dùng:
  - Container Name: `test-postgres-2`
  - Port: `5434` (port khác)
  - Database: `testdb2`

### 8. Cleanup Containers
Sau khi test xong, cleanup:
```bash
# Stop containers
docker stop test-postgres test-postgres-2

# Remove containers
docker rm test-postgres test-postgres-2

# Verify removed
docker ps -a | grep test-postgres
```

## Expected Results

✅ **Success Criteria:**
1. Template form hiển thị và validate đúng
2. Template chạy thành công (status: succeeded)
3. Output hiển thị Docker command rõ ràng
4. Docker command chạy được và tạo container
5. Container status: `Up` khi chạy `docker ps`
6. Kết nối PostgreSQL thành công qua psql
7. Có thể tạo table, insert, query data
8. Có thể tạo nhiều containers với ports khác nhau

## Troubleshooting

### Lỗi: Port already in use
```
Error: Bind for 0.0.0.0:5432 failed: port is already allocated
```
**Solution:** Đổi port khác (5433, 5434, etc.)

### Lỗi: Container name conflict
```
Error: The container name "/test-postgres" is already in use
```
**Solution:** 
```bash
docker rm test-postgres  # hoặc dùng tên khác
```

### Lỗi: Cannot connect to database
**Check:**
1. Container có đang chạy? `docker ps`
2. Port đúng chưa?
3. Password đúng chưa?
4. Wait 5-10s sau khi start container (PostgreSQL cần init)

### Container stopped immediately
```bash
# Check logs
docker logs test-postgres
```

## Ex2 Status: ✅ COMPLETED

Template working correctly với Option 1 (manual command execution).
