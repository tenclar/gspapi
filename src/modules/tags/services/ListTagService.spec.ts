import FakeTagRepository from '@modules/tags/repositories/fakes/FakeTagRepository';

import ListTagService from './ListTagService';

let fakeTagRepository: FakeTagRepository;

let listTag: ListTagService;

describe('ListTagsService', () => {
  beforeEach(() => {
    fakeTagRepository = new FakeTagRepository();

    listTag = new ListTagService(fakeTagRepository);
  });

  it('should not be able to List the providers', async () => {
    const tag1 = await fakeTagRepository.create({
      nome: 'CAC',
      slug: 'cac',
      status: true,
    });
    const tag2 = await fakeTagRepository.create({
      nome: 'CAC2',
      slug: 'cac2',

      status: true,
    });

    const tag = await listTag.execute();
    expect(tag).toEqual([tag1, tag2]);
  });
});
