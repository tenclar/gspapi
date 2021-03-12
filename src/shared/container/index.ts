import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository';
import CategoriasRepository from '@modules/categorias/infra/typeorm/repositories/CategoriasRepository';

import ICidadesRepository from '@modules/cidades/repositories/ICidadesRepository';
import CidadesRepository from '@modules/cidades/infra/typeorm/repositories/CidadesRepository';

import IOrgaosRepository from '@modules/orgaos/repositories/IOrgaosRepository';
import OrgaosRepository from '@modules/orgaos/infra/typeorm/repositories/OrgaosRepository';

import ISuperioresRepository from '@modules/superiores/repositories/ISuperioresRepository';
import SuperioresRepository from '@modules/superiores/infra/typeorm/repositories/SuperioresRepository';

import ILocalRepository from '@modules/local/repositories/ILocalRepository';
import LocalRepository from '@modules/local/infra/typeorm/repositories/LocalRepository';

import IServicosRepository from '@modules/servicos/repositories/IServicosRepository';
import ServicosRepository from '@modules/servicos/infra/typeorm/repositories/ServicosRepository';

import IAvisosRepository from '@modules/avisos/repositories/IAvisosRepository';
import AvisosRepository from '@modules/avisos/infra/typeorm/repositories/AvisosRepository';

import IInformacoesRepository from '@modules/informacoes/repositories/IInformacoesRepository';
import InformacoesRepository from '@modules/informacoes/infra/typeorm/repositories/InformacoesRepository';

import ICentraisRepository from '@modules/centrais/repositories/ICentraisRepository';
import CentraisRepository from '@modules/centrais/infra/typeorm/repositories/CentraisRepository';

import IPublicosRepository from '@modules/publicos/repositories/IPublicoRepository';
import PublicosRepository from '@modules/publicos/infra/typeorm/repositories/PublicoRepository';

import IPracasRepository from '@modules/pracas/repositories/IPracasRepository';
import PracasRepository from '@modules/pracas/infra/typeorm/repositories/PracasRepository';

import ITemasRepository from '@modules/temas/repositories/ITemaRepository';
import TemasRepository from '@modules/temas/infra/typeorm/repositories/TemaRepository';

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

container.registerSingleton<ICidadesRepository>(
  'CidadesRepository',
  CidadesRepository,
);

container.registerSingleton<IOrgaosRepository>(
  'OrgaosRepository',
  OrgaosRepository,
);

container.registerSingleton<ISuperioresRepository>(
  'SuperioresRepository',
  SuperioresRepository,
);

container.registerSingleton<ILocalRepository>(
  'LocalRepository',
  LocalRepository,
);
container.registerSingleton<IServicosRepository>(
  'ServicosRepository',
  ServicosRepository,
);

container.registerSingleton<IAvisosRepository>(
  'AvisosRepository',
  AvisosRepository,
);
container.registerSingleton<IInformacoesRepository>(
  'InformacoesRepository',
  InformacoesRepository,
);
container.registerSingleton<ICentraisRepository>(
  'CentraisRepository',
  CentraisRepository,
);
container.registerSingleton<IPublicosRepository>(
  'PublicosRepository',
  PublicosRepository,
);
container.registerSingleton<IPracasRepository>(
  'PracasRepository',
  PracasRepository,
);
container.registerSingleton<ITemasRepository>(
  'TemasRepository',
  TemasRepository,
);
