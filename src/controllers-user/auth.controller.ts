import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { ApiResponse } from '../model/dto/api-response.dto';
import { LoginRequest, RegisterRequest, AuthTokenResponse } from '../model/dto/auth.dto';
import { Success, BaseError } from '../shared/utils/response-helper';
import { UserService } from '../service/user.service';

@Route('auth')
@Tags('Auth')
export class UserAuthController extends Controller {
  private service = new UserService();

  @Post('register')
  public async register(@Body() body: RegisterRequest): Promise<ApiResponse> {
    try {
      const created = await this.service.register(body.email, body.password, body.name);
      return Success({ id: created.id, email: created.email, name: created.name, roles: created.roles });
    } catch (err: any) {
      this.setStatus(400);
      return BaseError(null, 0, err?.message || 'Registration failed');
    }
  }

  @Post('login')
  public async login(@Body() body: LoginRequest): Promise<ApiResponse> {
    try {
      const { user, token } = await this.service.login(body.email, body.password);
      const payload: AuthTokenResponse = {
        accessToken: token,
        tokenType: 'Bearer',
        expiresIn: 3600,
      };
      return Success(payload);
    } catch (err: any) {
      this.setStatus(401);
      return BaseError(null, 0, err?.message || 'Login failed');
    }
  }
}
