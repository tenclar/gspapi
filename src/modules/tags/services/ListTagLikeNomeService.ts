import { injectable, inject } from 'tsyringe';

import Tag from '@modules/tags/infra/typeorm/entities/Tag';
import ITagRepository from '@modules/tags/repositories/ITagRepository';

interface IRequest {
  nome: string;
}
@injectable()
class ListTagService {
  constructor(
    @inject('TagsRepository')
    private tagRepository: ITagRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Tag[]> {
    const tag = await this.tagRepository.findAllLikeNome(nome);

    return tag;
  }
}

export default ListTagService;
