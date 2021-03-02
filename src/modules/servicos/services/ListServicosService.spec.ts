import FakeServicosRepository from '@modules/servicos/repositories/fakes/FakeServicosRepository';
// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListServicosService';

let fakeServicosRepository: FakeServicosRepository;
// let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProviderService;

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeServicosRepository = new FakeServicosRepository();
    //  fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProviderService(fakeServicosRepository);
  });

  // fakeCacheProvider,
  it('should not be able to List the providers', async () => {
    const servico1 = await fakeServicosRepository.create({
      titulo: 'Titulo 1',
      slug: 'titulo-1',
      informacao: 'informacao',
      orgao_id: '1',
      categoria_id: '1',
    });
    const servico2 = await fakeServicosRepository.create({
      titulo: 'Titulo 2',
      slug: 'titulo-2',
      informacao: 'informacao2',
      orgao_id: '2',
      categoria_id: '2',
    });

    const providers = await listProviders.execute({ titulo: 'T' });
    expect(providers).toEqual([servico1, servico2]);
  });
});
