import { Controller, Get, Request, Route, Security, Tags } from 'tsoa';
import { ApiResponse } from '../../model/dto/api-response.dto';
import { Success } from '../../shared/utils/response-helper';

@Route('profile')
@Tags('User')
export class ProfileController extends Controller {
  @Get('me')
  @Security('jwt')
  public async me(@Request() req: any): Promise<ApiResponse> {
    const u = req.user as { id: string; email: string; name: string; roles: string[] };
    return Success({ id: u.id, email: u.email, name: u.name, roles: u.roles });
  }
}
