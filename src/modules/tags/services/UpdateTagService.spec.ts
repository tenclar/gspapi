import AppError from '../../../shared/errors/AppError';
import FakeTagRepository from '../repositories/fakes/FakeTagRepository';

import UpdateTagService from './UpdateTagService';

let fakeTagRepository: FakeTagRepository;

let updateTagService: UpdateTagService;

describe('UpdateTag', () => {
  beforeEach(() => {
    fakeTagRepository = new FakeTagRepository();

    updateTagService = new UpdateTagService(fakeTagRepository);
  });

  it('should be able to Update Tag', async () => {
    const local = await fakeTagRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
      status: true,
    });

    const updateTag = await updateTagService.execute({
      id: local.id,
      nome: 'Rios Brancos',
      status: true,
    });

    expect(updateTag.nome).toBe('Rios Brancos');
    expect(updateTag.slug).toBe('rios-brancos');
    expect(updateTag.status).toBe(true);
  });

  it('should not be able  update the local from non-existing local', async () => {
    expect(
      updateTagService.execute({
        id: 'non-existing-local-id',
        nome: 'Test',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
