import FakePracasRepository from '@modules/pracas/repositories/fakes/FakePracasRepository';

import ListPracasService from './ListPracasService';

let fakePracasRepository: FakePracasRepository;

let listPracas: ListPracasService;

describe('ListPracaservice', () => {
  beforeEach(() => {
    fakePracasRepository = new FakePracasRepository();

    listPracas = new ListPracasService(fakePracasRepository);
  });

  it('should not be able to List the providers', async () => {
    const praca1 = await fakePracasRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
      status: true,
    });
    const praca2 = await fakePracasRepository.create({
      nome: 'Rena Madureira',
      slug: 'rena-madureira',
      status: true,
    });

    const pracas = await listPracas.execute();
    expect(pracas).toEqual([praca1, praca2]);
  });
});
