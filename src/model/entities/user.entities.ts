import { Schema, model, Document } from 'mongoose';
import { Role } from '../enum/role.enum';

export interface IUser extends Document {
  email: string;
  password: string;           // hashed
  name: string;
  roles: Role[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  roles: { type: [String], enum: Object.values(Role), default: [Role.USER] },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const UserModel = model<IUser>('users', UserSchema);
