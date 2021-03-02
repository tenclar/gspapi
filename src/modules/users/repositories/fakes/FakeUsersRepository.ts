import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    const userFind = this.users.find(u => u.id === id);
    return userFind;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userFind = this.users.find(u => u.email === email);

    return userFind;
  }

  public async findAll(): Promise<User[]> {
    const { users } = this;
    return users;
  }

  async findAllLikeName(nome: string): Promise<User[]> {
    const users = this.users.filter(
      u => u.name.toLowerCase().indexOf(nome.toLocaleLowerCase()) > -1,
    );

    return users;
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }
}
export default FakeUsersRepository;
