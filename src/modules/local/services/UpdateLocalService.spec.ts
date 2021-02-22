import AppError from '../../../shared/errors/AppError';
import FakeLocalRepository from '../repositories/fakes/FakeLocalRepository';

import UpdateLocalService from './UpdateLocalService';

let fakeLocalRepository: FakeLocalRepository;

let updateLocalService: UpdateLocalService;

describe('UpdateLocal', () => {
  beforeEach(() => {
    fakeLocalRepository = new FakeLocalRepository();

    updateLocalService = new UpdateLocalService(fakeLocalRepository);
  });

  it('should be able to Update Local', async () => {
    const local = await fakeLocalRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
      orgao_id: '1',
      cidade_id: '1',
    });

    const updateLocal = await updateLocalService.execute({
      id: local.id,
      nome: 'Rios Brancos',
      orgao_id: '3',
      cidade_id: '3',
    });

    expect(updateLocal.nome).toBe('Rios Brancos');
    expect(updateLocal.slug).toBe('rios-brancos');
    expect(updateLocal.orgao_id).toBe('3');
    expect(updateLocal.cidade_id).toBe('3');
  });

  it('should not be able  update the local from non-existing local', async () => {
    expect(
      updateLocalService.execute({
        id: 'non-existing-local-id',
        nome: 'Test',
        orgao_id: '3',
        cidade_id: '3',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
