import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListUserService';

let fakeUsersRepository: FakeUsersRepository;
// let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProviderService;

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    //  fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProviderService(fakeUsersRepository);
  });

  // fakeCacheProvider,
  it('should not be able to List the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jhon doe',
      email: 'jhon@gmail.com',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'tenclar Valus',
      email: 'tenclar@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute();
    expect(providers).toEqual([user1, user2]);
  });
});
