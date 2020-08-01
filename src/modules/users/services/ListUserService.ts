import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}
@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<User[]> {
    /*
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

     */

    // if (!users) {
    const users = await this.usersRepository.findAll();

    // await this.cacheProvider.save(`providers-list:${user_id}`, users);
    // }

    return users;
  }
}

export default ListProviderService;
