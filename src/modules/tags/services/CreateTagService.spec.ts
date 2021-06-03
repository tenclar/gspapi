import FakeTagRepository from '../repositories/fakes/FakeTagRepository';
import CreateTagService from './CreateTagService';

import AppError from '../../../shared/errors/AppError';

let fakeTagRepository: FakeTagRepository;
let createTag: CreateTagService;

describe('CreateTag', () => {
  beforeEach(() => {
    fakeTagRepository = new FakeTagRepository();
    createTag = new CreateTagService(fakeTagRepository);
  });
  it('should be able to create a new tag', async () => {
    const tag = await createTag.execute({
      nome: 'CAC',
      status: true,
    });
    expect(tag).toHaveProperty('id');
  });

  it('should not be able to create tag with nome match', async () => {
    await createTag.execute({
      nome: 'CAC',
      status: true,
    });

    expect(
      createTag.execute({
        nome: 'CAC',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
