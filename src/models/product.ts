import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db/index.js';

// Định nghĩa kiểu dữ liệu Product
export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  createdAt?: Date; 
  updatedAt?: Date;
}
// Khi tạo mới, `id` có thể được tự động sinh ra
export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

// Định nghĩa lớp Model
export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Khai báo schema trong Sequelize
Product.init(
  {
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
  },
  {
    tableName: 'products',
    sequelize,
    timestamps: true, // Bật tạo tự động
  }
);
