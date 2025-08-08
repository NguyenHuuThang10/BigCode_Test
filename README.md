````md
# Node.js REST API with TypeScript + Sequelize (No Framework)

Dự án xây dựng REST API bằng **Node.js thuần**, sử dụng **TypeScript**, **Sequelize ORM** và **MySQL**.  
Không dùng Express hay bất kỳ framework nào

---

## 🚀 Hướng dẫn khởi chạy

### 1. Cài đặt thư viện
```bash
npm install
````

### 2. Tạo file `.env` tại thư mục gốc:

```env
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=localhost
DB_PORT=3306
```

> 💡 Lưu ý: bạn cần **tạo sẵn database** trong MySQL trước khi chạy dự án.

### 3. Build & chạy dự án

```bash
npm run dev
```

---

## 📦 API Endpoint

### ➕ Tạo sản phẩm mới

```http
POST /products
```

**Body (JSON hoặc form-url-encoded):**

```json
{
  "name": "Thịt bò",
  "price": 20000
}
```

### 📄 Lấy danh sách sản phẩm

```http
GET /products
```

---

## 🌐 Cấu hình CORS

Dự án đã hỗ trợ sẵn CORS để frontend (React, Vue, v.v.) gọi API:

```ts
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
```

---

## 📁 Cấu trúc thư mục

```
src/
├── server.ts              // Khởi động server
├── routes.ts              // Xử lý định tuyến
├── controllers/           // Logic xử lý request
├── models/                // Sequelize model (vd: Product)
├── config/db/             // Cấu hình & kết nối database
└── utils/parseBody.ts     // Hàm parse body POST request
```

---

```
