import FakeSuperioresRepository from '../repositories/fakes/FakeSuperioresRepository';
import CreateSuperioresService from './CreateSuperioresService';

import AppError from '../../../shared/errors/AppError';

let fakeSuperioresRepository: FakeSuperioresRepository;
let createSuperiores: CreateSuperioresService;

describe('CreateSuperiores', () => {
  beforeEach(() => {
    fakeSuperioresRepository = new FakeSuperioresRepository();
    createSuperiores = new CreateSuperioresService(fakeSuperioresRepository);
  });
  it('should be able to create a new superiore', async () => {
    const superiore = await createSuperiores.execute({
      nome: 'Secretaria de Estado',
    });
    expect(superiore).toHaveProperty('id');
  });

  it('should not be able to create superiore with nome match', async () => {
    await createSuperiores.execute({
      nome: 'Secretaria de Estado',
    });

    expect(
      createSuperiores.execute({
        nome: 'Secretaria de Estado',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
