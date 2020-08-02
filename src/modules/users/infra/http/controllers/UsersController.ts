import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    // delete user.password;
    return response.json({ user: classToClass(user) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = await container.resolve(ListUserService);
    const users = await listUsers.execute();
    return response.json({ users: classToClass(users) });
  }
}
