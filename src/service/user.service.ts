import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../model/entities/user.entities';
import { Role } from '../model/enum/role.enum';

const DEFAULT_JWT_SECRET = 'dev_secret_change_me';
const JWT_EXPIRES_IN_ENV = process.env.JWT_EXPIRES_IN;
const JWT_EXPIRES_IN_SECONDS: number = JWT_EXPIRES_IN_ENV ? Number(JWT_EXPIRES_IN_ENV) : 3600;
const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  roles: Role[];
}

export class UserService {
  async register(email: string, password: string, name: string) {
    const existing = await UserModel.findOne({ email }).lean();
    if (existing) {
      throw new Error('Email already registered');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const created = await UserModel.create({ email, password: hash, name, roles: [Role.USER] });
    return created;
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new Error('Invalid email or password');
    }
    const payload: JwtPayload = { sub: user.id, email: user.email, name: user.name, roles: user.roles };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN_SECONDS });
    return { user, token };
  }
}
