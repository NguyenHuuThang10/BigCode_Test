import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config(); // Load biến môi trường từ .env
// Khai báo Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASS || '', {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
    logging: false, // Tắt log query SQL nếu không cần
});
// Hàm kết nối DB
export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Kết nối database thành công!');
    }
    catch (error) {
        console.error('Kết nối database thất bại:', error);
        process.exit(1); // Thoát nếu kết nối lỗi
    }
}
export { sequelize };
