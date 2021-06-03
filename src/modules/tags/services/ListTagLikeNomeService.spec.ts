import FakeTagRepository from '@modules/tags/repositories/fakes/FakeTagRepository';

import ListTagLikeNomeService from './ListTagLikeNomeService';

let fakeTagRepository: FakeTagRepository;

let listTag: ListTagLikeNomeService;

describe('ListTagsService', () => {
  beforeEach(() => {
    fakeTagRepository = new FakeTagRepository();

    listTag = new ListTagLikeNomeService(fakeTagRepository);
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

    const tag = await listTag.execute({ nome: 'C' });
    expect(tag).toEqual([tag1, tag2]);
  });
});
