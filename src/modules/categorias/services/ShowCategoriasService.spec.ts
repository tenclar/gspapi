import AppError from '@shared/errors/AppError';
import FakeCategoriasRepository from '../repositories/fakes/FakeCategoriasRepository';

import ShowCategoriasService from './ShowCategoriasService';

let fakeCategoriasRepository: FakeCategoriasRepository;

let showCategorias: ShowCategoriasService;

describe('ShowCategoriasService', () => {
  beforeEach(() => {
    fakeCategoriasRepository = new FakeCategoriasRepository();
    showCategorias = new ShowCategoriasService(fakeCategoriasRepository);
  });

  it('should be able to show the Categorias', async () => {
    const cat = await fakeCategoriasRepository.create({
      titulo: 'Identidade',
      slug: 'identidade',
    });

    const categoria = await showCategorias.execute({
      id: cat.id,
    });

    expect(categoria.titulo).toBe('Identidade');
    expect(categoria.slug).toBe('identidade');
  });

  it('should not be able show the Categorias from non-existing Categorias', async () => {
    expect(
      showCategorias.execute({
        id: 'non-existing-categoria-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
