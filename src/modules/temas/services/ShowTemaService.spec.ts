import AppError from '@shared/errors/AppError';
import FakeTemaRepository from '../repositories/fakes/FakeTemaRepository';

import ShowTemaService from './ShowTemaService';

let fakeTemaRepository: FakeTemaRepository;

let showTema: ShowTemaService;

describe('ShowTemaService', () => {
  beforeEach(() => {
    fakeTemaRepository = new FakeTemaRepository();
    showTema = new ShowTemaService(fakeTemaRepository);
  });

  it('should be able to show the Tema', async () => {
    const Temahow = await fakeTemaRepository.create({
      nome: 'CAC',
      slug: 'cac',
      status: true,
    });

    const tema = await showTema.execute({
      id: Temahow.id,
    });

    expect(tema.nome).toBe('CAC');
    expect(tema.slug).toBe('cac');
    expect(tema.status).toBe(true);
  });

  it('should not be able show the Tema from non-existing Tema', async () => {
    expect(
      showTema.execute({
        id: 'non-existing-tema-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
