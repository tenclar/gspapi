import FakeCidadesRepository from '@modules/cidades/repositories/fakes/FakeCidadesRepository';

import ListCidadesService from './ListCidadesService';

let fakeCidadesRepository: FakeCidadesRepository;

let listCidades: ListCidadesService;

describe('ListCidadeService', () => {
  beforeEach(() => {
    fakeCidadesRepository = new FakeCidadesRepository();

    listCidades = new ListCidadesService(fakeCidadesRepository);
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

    const cidades = await listCidades.execute();
    expect(cidades).toEqual([cidade1, cidade2]);
  });
});
