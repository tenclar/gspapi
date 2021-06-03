import AppError from '../../../shared/errors/AppError';
import FakeTemaRepository from '../repositories/fakes/FakeTemaRepository';

import UpdateTemaService from './UpdateTemaService';

let fakeTemaRepository: FakeTemaRepository;

let updateTemaService: UpdateTemaService;

describe('UpdateTema', () => {
  beforeEach(() => {
    fakeTemaRepository = new FakeTemaRepository();

    updateTemaService = new UpdateTemaService(fakeTemaRepository);
  });

  it('should be able to Update Tema', async () => {
    const local = await fakeTemaRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
      status: true,
    });

    const updateTema = await updateTemaService.execute({
      id: local.id,
      nome: 'Rios Brancos',
      status: true,
    });

    expect(updateTema.nome).toBe('Rios Brancos');
    expect(updateTema.slug).toBe('rios-brancos');
    expect(updateTema.status).toBe(true);
  });

  it('should not be able  update the local from non-existing local', async () => {
    expect(
      updateTemaService.execute({
        id: 'non-existing-local-id',
        nome: 'Test',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
