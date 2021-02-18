import FakeCategoriasRepository from '../repositories/fakes/FakeCategoriasRepository';

import CreateCategoriasService from './CreateCategoriasService';
import AppError from '../../../shared/errors/AppError';

let fakeCategoriasRepository: FakeCategoriasRepository;
let createCategorias: CreateCategoriasService;

describe('CreateCategoria', () => {
  beforeEach(() => {
    fakeCategoriasRepository = new FakeCategoriasRepository();
    createCategorias = new CreateCategoriasService(fakeCategoriasRepository);
  });

  it('should be able to create a new categoria', async () => {
    const categoria = await createCategorias.execute({
      titulo: 'Titulo 1',
      categoria_id: '11',
    });

    expect(categoria).toHaveProperty('id');
  });

  it('should not be able to create categoria with titulo match', async () => {
    await createCategorias.execute({
      titulo: 'Titulo 1',
      categoria_id: '12',
    });

    expect(
      createCategorias.execute({
        titulo: 'Titulo 1',
        categoria_id: '12',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
