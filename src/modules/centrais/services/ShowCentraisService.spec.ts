import AppError from '@shared/errors/AppError';
import FakeCentraisRepository from '../repositories/fakes/FakeCentraisRepository';

import ShowCentraisService from './ShowCentraisService';

let fakeCentraisRepository: FakeCentraisRepository;

let showCentrais: ShowCentraisService;

describe('ShowCentraisService', () => {
  beforeEach(() => {
    fakeCentraisRepository = new FakeCentraisRepository();
    showCentrais = new ShowCentraisService(fakeCentraisRepository);
  });

  it('should be able to show the Centrais', async () => {
    const centraishow = await fakeCentraisRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
      status: false,
    });

    const central = await showCentrais.execute({
      id: centraishow.id,
    });

    expect(central.nome).toBe('Rio Branco');
    expect(central.slug).toBe('rio-branco');
  });

  it('should not be able show the Centrais from non-existing Centrais', async () => {
    expect(
      showCentrais.execute({
        id: 'non-existing-central-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
