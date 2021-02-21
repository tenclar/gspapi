import AppError from '@shared/errors/AppError';
import FakeSuperioresRepository from '../repositories/fakes/FakeSuperioresRepository';

import ShowSuperioresService from './ShowSuperioresService';

let fakeSuperioresRepository: FakeSuperioresRepository;

let showSuperiores: ShowSuperioresService;

describe('ShowSuperioresService', () => {
  beforeEach(() => {
    fakeSuperioresRepository = new FakeSuperioresRepository();
    showSuperiores = new ShowSuperioresService(fakeSuperioresRepository);
  });

  it('should be able to show the Superiores', async () => {
    const superioreShow = await fakeSuperioresRepository.create({
      nome: 'Secretaria',
      slug: 'secretaria',
    });

    const superiore = await showSuperiores.execute({
      id: superioreShow.id,
    });

    expect(superiore.nome).toBe('Secretaria');
    expect(superiore.slug).toBe('secretaria');
  });

  it('should not be able show the Superiores from non-existing Superiores', async () => {
    expect(
      showSuperiores.execute({
        id: 'non-existing-superiore-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
