// Import module http của Node.js để tạo server
import http from "http";
// Import hàm điều phối request đến đúng controller
import { handleRequest } from "./routes.js";
// Import hàm kết nối cơ sở dữ liệu từ Sequelize
import { connectDB } from "./config/db/index.js";
// Import model Product để đảm bảo đồng bộ schema (có thể sync bảng)
import { Product } from "./models/product.js";
// Khai báo cổng mà server sẽ lắng nghe
const PORT = process.env.PORT;
/**
 * Quy trình khởi chạy server:
 * 1. Kết nối đến cơ sở dữ liệu
 * 2. Đồng bộ bảng `products` (tạo bảng nếu chưa có)
 * 3. Tạo server HTTP
 * 4. Lắng nghe và xử lý các request thông qua handleRequest
 */
connectDB()
    .then(async () => {
    // Đồng bộ bảng sản phẩm, thêm cột nếu thiếu (chỉ nên dùng khi dev)
    await Product.sync(); // 👉 có thể thay bằng .sync({ alter: true }) nếu cần tự động cập nhật cột
    // Tạo server HTTP thuần
    const server = http.createServer((req, res) => {
        handleRequest(req, res); // xử lý routing và controller logic
    });
    // Khởi động server và log ra terminal
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    // Nếu kết nối DB thất bại, log lỗi và dừng chương trình
    console.error("Lỗi kết nối DB, không khởi chạy server.", err);
    process.exit(1);
});
