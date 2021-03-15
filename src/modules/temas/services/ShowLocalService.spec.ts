import AppError from '@shared/errors/AppError';
import FakeLocalRepository from '../repositories/fakes/FakeLocalRepository';

import ShowLocalService from './ShowLocalService';

let fakeLocalRepository: FakeLocalRepository;

let showLocal: ShowLocalService;

describe('ShowLocalService', () => {
  beforeEach(() => {
    fakeLocalRepository = new FakeLocalRepository();
    showLocal = new ShowLocalService(fakeLocalRepository);
  });

  it('should be able to show the Local', async () => {
    const Localhow = await fakeLocalRepository.create({
      nome: 'CAC',
      slug: 'cac',
      orgao_id: '1',
      cidade_id: '1',
    });

    const local = await showLocal.execute({
      id: Localhow.id,
    });

    expect(local.nome).toBe('CAC');
    expect(local.slug).toBe('cac');
    expect(local.orgao_id).toBe('1');
    expect(local.cidade_id).toBe('1');
  });

  it('should not be able show the Local from non-existing Local', async () => {
    expect(
      showLocal.execute({
        id: 'non-existing-local-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
