// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeServicosRepository from '../repositories/fakes/FakeServicosRepository';

import CreateServicosService from './CreateServicosService';
import AppError from '../../../shared/errors/AppError';

let fakeServicosRepository: FakeServicosRepository;
let createServicos: CreateServicosService;
// let fakeCacheProvider: FakeCacheProvider;

describe('CreateServico', () => {
  beforeEach(() => {
    fakeServicosRepository = new FakeServicosRepository();

    // fakeCacheProvider = new FakeCacheProvider();
    createServicos = new CreateServicosService(
      fakeServicosRepository,
      // fakeHashProvider,
      // fakeCacheProvider,
    );
  });

  it('should be able to create a new servico', async () => {
    const servico = await createServicos.execute({
      titulo: 'Titulo 1',
      informacao: 'informacao',
      orgao_id: '1',
      categoria_id: '1',
    });

    expect(servico).toHaveProperty('id');
  });

  it('should not be able to create servico with  titulo match', async () => {
    await createServicos.execute({
      titulo: 'Titulo 1',
      informacao: 'dados do servico',
      orgao_id: '1',
      categoria_id: '1',
    });

    expect(
      createServicos.execute({
        titulo: 'Titulo 1',
        informacao: 'dados do servico',
        orgao_id: '1',
        categoria_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
