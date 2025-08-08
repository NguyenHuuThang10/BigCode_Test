import { IncomingMessage } from "http";
import { parse as parseQuery } from "querystring";

/**
 * Hàm parseBody dùng để phân tích dữ liệu body từ request HTTP thuần
 * - Hỗ trợ cả định dạng JSON và x-www-form-urlencoded
 * - Trả về object đã parse để sử dụng trong controller
 */
export async function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";

    // Lắng nghe sự kiện nhận từng phần dữ liệu từ request
    req.on("data", (chunk) => {
      body += chunk;
    });

    // Khi toàn bộ dữ liệu đã được nhận xong
    req.on("end", () => {
      try {
        const contentType = req.headers["content-type"];

        // Nếu dữ liệu dạng JSON
        if (contentType?.includes("application/json")) {
          resolve(JSON.parse(body));
        }
        // Nếu dữ liệu dạng x-www-form-urlencoded (thường dùng trong form HTML)
        else if (contentType?.includes("application/x-www-form-urlencoded")) {
          resolve(parseQuery(body)); // Trả về object { key: value }
        }
        // Các content-type khác không xử lý → trả về object rỗng
        else {
          resolve({});
        }
      } catch (error) {
        reject(error); // Nếu parse JSON lỗi thì reject promise
      }
    });

    // Nếu có lỗi khi đọc dữ liệu
    req.on("error", (err) => {
      reject(err);
    });
  });
}
