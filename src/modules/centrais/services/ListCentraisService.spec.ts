import FakeCentraisRepository from '@modules/centrais/repositories/fakes/FakeCentraisRepository';

import ListCentraisService from './ListCentraisService';

let fakeCentraisRepository: FakeCentraisRepository;

let listCentrais: ListCentraisService;

describe('ListCentraiservice', () => {
  beforeEach(() => {
    fakeCentraisRepository = new FakeCentraisRepository();

    listCentrais = new ListCentraisService(fakeCentraisRepository);
  });

  it('should not be able to List the providers', async () => {
    const central1 = await fakeCentraisRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
    });
    const central2 = await fakeCentraisRepository.create({
      nome: 'Rena Madureira',
      slug: 'rena-madureira',
    });

    const centrais = await listCentrais.execute({ nome: 'R' });
    expect(centrais).toEqual([central1, central2]);
  });
});
