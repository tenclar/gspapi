import FakeCentraisRepository from '@modules/centrais/repositories/fakes/FakeCentraisRepository';

import ListCentraisLikeNomeService from './ListCentraisLikeNomeService';

let fakeCentraisRepository: FakeCentraisRepository;

let listCentrais: ListCentraisLikeNomeService;

describe('ListCentraisLikeNomeService', () => {
  beforeEach(() => {
    fakeCentraisRepository = new FakeCentraisRepository();

    listCentrais = new ListCentraisLikeNomeService(fakeCentraisRepository);
  });

  it('should not be able to List the Centrais Like nome', async () => {
    const central1 = await fakeCentraisRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
      status: true,
    });
    const central2 = await fakeCentraisRepository.create({
      nome: 'Rena Madureira',
      slug: 'rena-madureira',
      status: true,
    });

    const centrais = await listCentrais.execute({ nome: 'R' });
    expect(centrais).toEqual([central1, central2]);
  });
});
