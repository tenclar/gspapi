import { injectable, inject } from 'tsyringe';

import Tag from '@modules/tags/infra/typeorm/entities/Tag';
import ITagRepository from '@modules/tags/repositories/ITagRepository';

@injectable()
class ListTagService {
  constructor(
    @inject('TagsRepository')
    private tagRepository: ITagRepository,
  ) {}

  public async execute(): Promise<Tag[]> {
    const tag = await this.tagRepository.findAll();

    return tag;
  }
}

export default ListTagService;
