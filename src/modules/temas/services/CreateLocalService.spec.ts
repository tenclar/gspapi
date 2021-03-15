import FakeLocalRepository from '../repositories/fakes/FakeLocalRepository';
import CreateLocalService from './CreateLocalService';

import AppError from '../../../shared/errors/AppError';

let fakeLocalRepository: FakeLocalRepository;
let createLocal: CreateLocalService;

describe('CreateLocal', () => {
  beforeEach(() => {
    fakeLocalRepository = new FakeLocalRepository();
    createLocal = new CreateLocalService(fakeLocalRepository);
  });
  it('should be able to create a new local', async () => {
    const local = await createLocal.execute({
      nome: 'CAC',
      orgao_id: '1',
      cidade_id: '1',
    });
    expect(local).toHaveProperty('id');
  });

  it('should not be able to create local with nome match', async () => {
    await createLocal.execute({
      nome: 'CAC',
      orgao_id: '1',
      cidade_id: '1',
    });

    expect(
      createLocal.execute({
        nome: 'CAC',
        orgao_id: '1',
        cidade_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
