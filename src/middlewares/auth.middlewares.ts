import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '../model/enum/role.enum';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: Role[];
}

// TSOA expects this function to be exported exactly as 'expressAuthentication'
export async function expressAuthentication(request: Request, securityName?: string, scopes?: string[]): Promise<AuthUser> {
  if (securityName !== 'jwt') {
    throw new Error('Unsupported security scheme');
  }
  const auth = request.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) {
    throw new Error('No authorization token provided');
  }
  const token = auth.substring('Bearer '.length);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user: AuthUser = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      roles: decoded.roles || [],
    };

    // Optional scope/role checks
    if (scopes && scopes.length) {
      const hasAll = scopes.every(s => user.roles.includes(s as Role));
      if (!hasAll) {
        throw new Error('Insufficient scope');
      }
    }

    return user;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}

const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/admin/docs'];

function verifyAndAttach(req: Request): AuthUser {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) {
    throw Object.assign(new Error('No authorization token provided'), { status: 401 });
  }
  const token = auth.substring('Bearer '.length);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user: AuthUser = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      roles: decoded.roles || [],
    };
    (req as any).user = user;
    return user;
  } catch (e) {
    throw Object.assign(new Error('Invalid or expired token'), { status: 401 });
  }
}

export function adminGuard(req: Request, res: Response, next: NextFunction) {
  if (PUBLIC_PATHS.some(p => req.path.startsWith(p))) {
    return next();
  }
  try {
    const user = verifyAndAttach(req);
    if (!user.roles.includes(Role.ADMIN)) {
      return res.status(403).json({ message: 'Forbidden: ADMIN role required' });
    }
    next();
  } catch (err: any) {
    return res.status(err.status || 401).json({ message: err.message || 'Unauthorized' });
  }
}

export function userGuard(req: Request, res: Response, next: NextFunction) {
  if (PUBLIC_PATHS.some(p => req.path.startsWith(p))) {
    return next();
  }
  try {
    const user = verifyAndAttach(req);
    if (!(user.roles.includes(Role.USER) || user.roles.includes(Role.ADMIN))) {
      return res.status(403).json({ message: 'Forbidden: USER role required' });
    }
    next();
  } catch (err: any) {
    return res.status(err.status || 401).json({ message: err.message || 'Unauthorized' });
  }
}
