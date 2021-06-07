import FakePracasRepository from '@modules/pracas/repositories/fakes/FakePracasRepository';

import ListPracasLikeNomeService from './ListPracasLikeNomeService';

let fakePracasRepository: FakePracasRepository;

let listPracas: ListPracasLikeNomeService;

describe('ListPracaservice', () => {
  beforeEach(() => {
    fakePracasRepository = new FakePracasRepository();

    listPracas = new ListPracasLikeNomeService(fakePracasRepository);
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

    const pracas = await listPracas.execute({ nome: 'R' });
    expect(pracas).toEqual([praca1, praca2]);
  });
});
