import { Body, Controller, Put, Route, Tags, Security, Path } from 'tsoa';
import { ApiResponse } from '../../model/dto/api-response.dto';
import { Success, BaseError } from '../../shared/utils/response-helper';
import { Role } from '../../model/enum/role.enum';
import { UserModel } from '../../model/entities/user.entities';

interface UpdateRolesRequest {
  roles: Role[];
}

@Route('users')
@Tags('User')
@Security('jwt')
export class UserController extends Controller {
  @Put('{id}/roles')
  @Security('jwt', ['ADMIN'])
  public async updateUserRoles(
    @Path() id: string,
    @Body() body: UpdateRolesRequest
  ): Promise<ApiResponse> {
    try {
      if (!body.roles || !Array.isArray(body.roles) || body.roles.length === 0) {
        this.setStatus(400);
        return BaseError(null, 0, 'Roles payload is required and must be a non-empty array');
      }
      const validRoles = Object.values(Role);
      const invalid = body.roles.filter(r => !validRoles.includes(r));
      if (invalid.length > 0) {
        this.setStatus(400);
        return BaseError(null, 0, `Invalid roles: ${invalid.join(', ')}`);
      }

      const updated = await UserModel.findByIdAndUpdate(
        id,
        { roles: body.roles },
        { new: true }
      ).lean();

      if (!updated) {
        this.setStatus(404);
        return BaseError(null, 0, 'User not found');
      }

      return Success({ id: (updated as any)._id?.toString?.() ?? (updated as any).id, email: (updated as any).email, name: (updated as any).name, roles: (updated as any).roles }, 1, 'Roles updated');
    } catch (err: any) {
      this.setStatus(500);
      return BaseError(null, 0, err?.message || 'Failed to update roles');
    }
  }
}
