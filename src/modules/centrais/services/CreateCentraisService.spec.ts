import FakeCentraisRepository from '../repositories/fakes/FakeCentraisRepository';
import CreateCentraisService from './CreateCentraisService';

import AppError from '../../../shared/errors/AppError';

let fakeCentraisRepository: FakeCentraisRepository;
let createCentrais: CreateCentraisService;

describe('CreateCentrais', () => {
  beforeEach(() => {
    fakeCentraisRepository = new FakeCentraisRepository();
    createCentrais = new CreateCentraisService(fakeCentraisRepository);
  });
  it('should be able to create a new central', async () => {
    const central = await createCentrais.execute({
      nome: 'Rio Branco',
    });
    expect(central).toHaveProperty('id');
  });

  it('should not be able to create central with nome match', async () => {
    await createCentrais.execute({
      nome: 'Rio Branco',
    });

    expect(
      createCentrais.execute({
        nome: 'Rio Branco',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
