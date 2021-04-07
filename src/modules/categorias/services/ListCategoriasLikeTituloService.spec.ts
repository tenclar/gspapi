import FakeCategoriasRepository from '@modules/categorias/repositories/fakes/FakeCategoriasRepository';
// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListCategoriasLikeTituloService from './ListCategoriasLikeTituloService';

let fakeCategoriasRepository: FakeCategoriasRepository;
// let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListCategoriasLikeTituloService;

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeCategoriasRepository = new FakeCategoriasRepository();
    //  fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListCategoriasLikeTituloService(
      fakeCategoriasRepository,
    );
  });

  // fakeCacheProvider,
  it('should not be able to List the providers', async () => {
    const categoria1 = await fakeCategoriasRepository.create({
      titulo: 'Jhon doe',
      slug: 'Jhon doe',
      categoria_id: '123',
    });
    const categoria2 = await fakeCategoriasRepository.create({
      titulo: 'Jhon doe',
      slug: 'Jhon doe',
      categoria_id: '123',
    });

    const providers = await listProviders.execute({ titulo: 'J' });
    expect(providers).toEqual([categoria1, categoria2]);
  });
});
