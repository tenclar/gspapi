import FakeSuperioresRepository from '@modules/superiores/repositories/fakes/FakeSuperioresRepository';

import ListSuperioresService from './ListSuperioresService';

let fakeSuperioresRepository: FakeSuperioresRepository;

let listSuperiores: ListSuperioresService;

describe('ListSuperioresService', () => {
  beforeEach(() => {
    fakeSuperioresRepository = new FakeSuperioresRepository();

    listSuperiores = new ListSuperioresService(fakeSuperioresRepository);
  });

  it('should not be able to List the Instituições Superiores', async () => {
    const superiore1 = await fakeSuperioresRepository.create({
      nome: 'Secretaria de Estado',
      slug: 'secretaria-de-estado',
    });
    const superiore2 = await fakeSuperioresRepository.create({
      nome: 'Secretaria Gestão',
      slug: 'secretaria-gestao',
    });

    const superiores = await listSuperiores.execute();
    expect(superiores).toEqual([superiore1, superiore2]);
  });
});
