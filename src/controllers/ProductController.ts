import { IncomingMessage, ServerResponse } from "http";
import { Product } from "../models/product.js";
import { parseBody } from "../utils/parseBody.js";

/**
 * Controller xử lý POST /products
 * - Nhận request body (hỗ trợ JSON và x-www-form-urlencoded)
 * - Validate dữ liệu đầu vào: `name` phải có, `price` phải là số
 * - Nếu hợp lệ thì lưu sản phẩm vào DB
 * - Trả về sản phẩm mới đã lưu
 */
export const createProduct = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  try {
    // Phân tích nội dung request body
    const body = await parseBody(req);

    // Lấy giá trị name và price từ body
    const name = body.name;
    const price = parseFloat(body.price);

    // Nếu thiếu name hoặc price không hợp lệ → trả về lỗi 400
    if (!name || isNaN(price)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid product data." }));
      return;
    }

    // Tạo sản phẩm mới trong database
    const newProduct = await Product.create({ name, price });

    // Trả về sản phẩm vừa tạo
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    // Lỗi trong quá trình xử lý → trả về lỗi 500
    console.error("Lỗi tạo sản phẩm:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};

/**
 * Controller xử lý GET /products
 * - Truy vấn toàn bộ sản phẩm từ bảng `products`
 * - Trả về danh sách sản phẩm dạng JSON
 */
export const getAllProducts = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  try {
    // Truy vấn tất cả bản ghi từ DB
    const products = await Product.findAll();

    // Trả về kết quả
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    // Lỗi khi truy vấn DB → trả về lỗi 500
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};
