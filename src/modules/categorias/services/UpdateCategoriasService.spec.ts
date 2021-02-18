import AppError from '../../../shared/errors/AppError';
import FakeCategoriasRepository from '../repositories/fakes/FakeCategoriasRepository';

import UpdateCategoriasService from './UpdateCategoriasService';

let fakeCategoriasRepository: FakeCategoriasRepository;

let updateCategorias: UpdateCategoriasService;

describe('UpdateCategorias', () => {
  beforeEach(() => {
    fakeCategoriasRepository = new FakeCategoriasRepository();

    updateCategorias = new UpdateCategoriasService(fakeCategoriasRepository);
  });

  it('should be able to Update Categorias', async () => {
    const categoria = await fakeCategoriasRepository.create({
      titulo: 'Identidade',
      slug: 'identidade',
    });

    const updateCategoria = await updateCategorias.execute({
      id: categoria.id,
      titulo: 'Identidade 1 via',
    });

    expect(updateCategoria.titulo).toBe('Identidade 1 via');
    expect(updateCategoria.slug).toBe('identidade-1-via');
  });

  it('should be able to Update Categorias with Subcategorias', async () => {
    const categoria = await fakeCategoriasRepository.create({
      titulo: 'Identidade',
      slug: 'identidade',
      categoria_id: '123',
    });

    const updateCategoria = await updateCategorias.execute({
      id: categoria.id,
      titulo: 'Identidade 1 via',
      categoria_id: '111',
    });

    expect(updateCategoria.categoria_id).toBe('111');
  });

  it('should not be able  update the categorias from non-existing categorias', async () => {
    expect(
      updateCategorias.execute({
        id: 'non-existing-categorias-id',
        titulo: 'Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
