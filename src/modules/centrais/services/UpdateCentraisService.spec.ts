import AppError from '../../../shared/errors/AppError';
import FakeCentraisRepository from '../repositories/fakes/FakeCentraisRepository';

import UpdateCentraisService from './UpdateCentraisService';

let fakeCentraisRepository: FakeCentraisRepository;

let updateCentrais: UpdateCentraisService;

describe('UpdateCentrais', () => {
  beforeEach(() => {
    fakeCentraisRepository = new FakeCentraisRepository();

    updateCentrais = new UpdateCentraisService(fakeCentraisRepository);
  });

  it('should be able to Update Centrais', async () => {
    const central = await fakeCentraisRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
    });

    const updateCentral = await updateCentrais.execute({
      id: central.id,
      nome: 'Rios Brancos',
    });

    expect(updateCentral.nome).toBe('Rios Brancos');
    expect(updateCentral.slug).toBe('rios-brancos');
  });

  it('should not be able  update the centrais from non-existing centrais', async () => {
    expect(
      updateCentrais.execute({
        id: 'non-existing-centrais-id',
        nome: 'Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
