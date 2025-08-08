import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/index.js';
// Định nghĩa lớp Model
export class Product extends Model {
}
// Khai báo schema trong Sequelize
Product.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false,
    },
    // Không cần định nghĩa createdAt/updatedAt ở đây nếu dùng mặc định
}, {
    tableName: 'products',
    sequelize,
    timestamps: true, // Bật tạo tự động
});
