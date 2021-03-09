import FakePracasRepository from '../repositories/fakes/FakePracasRepository';
import CreatePracasService from './CreatePracasService';

import AppError from '../../../shared/errors/AppError';

let fakePracasRepository: FakePracasRepository;
let createPracas: CreatePracasService;

describe('CreatePracas', () => {
  beforeEach(() => {
    fakePracasRepository = new FakePracasRepository();
    createPracas = new CreatePracasService(fakePracasRepository);
  });
  it('should be able to create a new praca', async () => {
    const praca = await createPracas.execute({
      nome: 'Rio Branco',
      status: true,
    });
    expect(praca).toHaveProperty('id');
  });

  it('should not be able to create praca with nome match', async () => {
    await createPracas.execute({
      nome: 'Rio Branco',
      status: true,
    });

    expect(
      createPracas.execute({
        nome: 'Rio Branco',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
