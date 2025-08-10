import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
import { ApiResponse } from '../model/dto/api-response.dto';
import { User } from '../model/entities/user.entities';
import { Success } from '../shared/utils/response-helper';


@Route('users')
@Tags('User')
export class UserController extends Controller {
  @Get('/')
  public async getUsers(): Promise<User[]> {
    return [
      { id: 1, name: 'Nhat' },
      { id: 2, name: 'Vo' }
    ];
  }
  @Post('/')
  public async createUser(@Body() user: User): Promise<ApiResponse> {
    let users: User[] = [
      { id: 1, name: 'Nhat' },
      { id: 2, name: 'Vo' }
    ];
    const newUser = { ...user, id: 1 };
    users.push(newUser);
    return Success(newUser, users.length, 'User created successfully');
  }
}