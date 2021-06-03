import FakeCidadesRepository from '@modules/cidades/repositories/fakes/FakeCidadesRepository';

import ListCidadesLikeNomeService from './ListCidadesLikeNomeService';

let fakeCidadesRepository: FakeCidadesRepository;

let listCidades: ListCidadesLikeNomeService;

describe('ListCidadeService', () => {
  beforeEach(() => {
    fakeCidadesRepository = new FakeCidadesRepository();

    listCidades = new ListCidadesLikeNomeService(fakeCidadesRepository);
  });

  it('should not be able to List the providers', async () => {
    const cidade1 = await fakeCidadesRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
      status: true,
    });
    const cidade2 = await fakeCidadesRepository.create({
      nome: 'Rena Madureira',
      slug: 'rena-madureira',
      status: true,
    });

    const cidades = await listCidades.execute({ nome: 'R' });
    expect(cidades).toEqual([cidade1, cidade2]);
  });
});
