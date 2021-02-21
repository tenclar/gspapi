import FakeCidadesRepository from '../repositories/fakes/FakeCidadesRepository';
import CreateCidadesService from './CreateCidadesService';

import AppError from '../../../shared/errors/AppError';

let fakeCidadesRepository: FakeCidadesRepository;
let createCidades: CreateCidadesService;

describe('CreateCidades', () => {
  beforeEach(() => {
    fakeCidadesRepository = new FakeCidadesRepository();
    createCidades = new CreateCidadesService(fakeCidadesRepository);
  });
  it('should be able to create a new cidade', async () => {
    const cidade = await createCidades.execute({
      nome: 'Rio Branco',
    });
    expect(cidade).toHaveProperty('id');
  });

  it('should not be able to create cidade with nome match', async () => {
    await createCidades.execute({
      nome: 'Rio Branco',
    });

    expect(
      createCidades.execute({
        nome: 'Rio Branco',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
