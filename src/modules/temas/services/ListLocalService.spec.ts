import FakeLocalRepository from '@modules/local/repositories/fakes/FakeLocalRepository';

import ListLocalService from './ListLocalService';

let fakeLocalRepository: FakeLocalRepository;

let listLocal: ListLocalService;

describe('ListLocalervice', () => {
  beforeEach(() => {
    fakeLocalRepository = new FakeLocalRepository();

    listLocal = new ListLocalService(fakeLocalRepository);
  });

  it('should not be able to List the providers', async () => {
    const local1 = await fakeLocalRepository.create({
      nome: 'CAC',
      slug: 'cac',
      orgao_id: '1',
      cidade_id: '1',
    });
    const local2 = await fakeLocalRepository.create({
      nome: 'CAC2',
      slug: 'cac2',
      orgao_id: '2',
      cidade_id: '2',
    });

    const local = await listLocal.execute({ nome: 'C' });
    expect(local).toEqual([local1, local2]);
  });
});
