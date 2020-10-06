import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository';
import CategoriasRepository from '@modules/categorias/infra/typeorm/repositories/CategoriasRepository';

import IServicosRepository from '@modules/servicos/repositories/IServicosRepository';
import ServicosRepository from '@modules/servicos/infra/typeorm/repositories/ServicosRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICategoriasRepository>(
  'CategoriasRepository',
  CategoriasRepository,
);

container.registerSingleton<IServicosRepository>(
  'ServicosRepository',
  ServicosRepository,
);
