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
      titulo: 'Jhon doe',
      slug: 'Jhon doe',
      informacao: 'informacao',
    });
    const servico2 = await fakeServicosRepository.create({
      titulo: 'Jhon doe',
      slug: 'Jhon doe',
      informacao: 'informacao',
    });

    const providers = await listProviders.execute();
    expect(providers).toEqual([servico1, servico2]);
  });
});
