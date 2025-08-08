import { createProduct, getAllProducts } from "./controllers/ProductController.js";
/**
 * Hàm điều phối request đến đúng controller
 * - Hỗ trợ POST /products: thêm sản phẩm mới
 * - Hỗ trợ GET /products: lấy danh sách sản phẩm
 */
export const handleRequest = (req, res) => {
    const { method, url } = req;
    // Thiết lập header CORS cho tất cả response
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // Xử lý preflight request (OPTIONS) trước các POST/PUT từ frontend
    if (method === "OPTIONS") {
        res.writeHead(204); // No Content
        res.end();
        return;
    }
    // Route: POST /products — tạo sản phẩm mới
    if (method === "POST" && url === "/products") {
        createProduct(req, res);
        return;
    }
    // Route: GET /products — lấy danh sách tất cả sản phẩm
    if (method === "GET" && url === "/products") {
        getAllProducts(req, res);
        return;
    }
    // Nếu không khớp route nào — trả về lỗi 404
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
};
