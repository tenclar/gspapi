import AppError from '../../../shared/errors/AppError';
import FakeSuperioresRepository from '../repositories/fakes/FakeSuperioresRepository';

import UpdateSuperioresService from './UpdateSuperioresService';

let fakeSuperioresRepository: FakeSuperioresRepository;

let updateSuperiores: UpdateSuperioresService;

describe('UpdateSuperiores', () => {
  beforeEach(() => {
    fakeSuperioresRepository = new FakeSuperioresRepository();

    updateSuperiores = new UpdateSuperioresService(fakeSuperioresRepository);
  });

  it('should be able to Update Superiores', async () => {
    const superiore = await fakeSuperioresRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
    });

    const updateSuperiore = await updateSuperiores.execute({
      id: superiore.id,
      nome: 'Rios Brancos',
    });

    expect(updateSuperiore.nome).toBe('Rios Brancos');
    expect(updateSuperiore.slug).toBe('rios-brancos');
  });

  it('should not be able  update the superiores from non-existing superiores', async () => {
    expect(
      updateSuperiores.execute({
        id: 'non-existing-superiores-id',
        nome: 'Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
