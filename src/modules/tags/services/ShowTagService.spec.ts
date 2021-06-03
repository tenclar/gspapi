import AppError from '@shared/errors/AppError';
import FakeTagRepository from '../repositories/fakes/FakeTagRepository';

import ShowTagService from './ShowTagService';

let fakeTagRepository: FakeTagRepository;

let showTag: ShowTagService;

describe('ShowTagService', () => {
  beforeEach(() => {
    fakeTagRepository = new FakeTagRepository();
    showTag = new ShowTagService(fakeTagRepository);
  });

  it('should be able to show the Tag', async () => {
    const Taghow = await fakeTagRepository.create({
      nome: 'CAC',
      slug: 'cac',
      status: true,
    });

    const tag = await showTag.execute({
      id: Taghow.id,
    });

    expect(tag.nome).toBe('CAC');
    expect(tag.slug).toBe('cac');
    expect(tag.status).toBe(true);
  });

  it('should not be able show the Tag from non-existing Tag', async () => {
    expect(
      showTag.execute({
        id: 'non-existing-tag-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
