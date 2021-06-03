import FakeTemaRepository from '../repositories/fakes/FakeTemaRepository';
import CreateTemaService from './CreateTemaService';

import AppError from '../../../shared/errors/AppError';

let fakeTemaRepository: FakeTemaRepository;
let createTema: CreateTemaService;

describe('CreateTema', () => {
  beforeEach(() => {
    fakeTemaRepository = new FakeTemaRepository();
    createTema = new CreateTemaService(fakeTemaRepository);
  });
  it('should be able to create a new tema', async () => {
    const tema = await createTema.execute({
      nome: 'CAC',
      status: true,
    });
    expect(tema).toHaveProperty('id');
  });

  it('should not be able to create tema with nome match', async () => {
    await createTema.execute({
      nome: 'CAC',
      status: true,
    });

    expect(
      createTema.execute({
        nome: 'CAC',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
