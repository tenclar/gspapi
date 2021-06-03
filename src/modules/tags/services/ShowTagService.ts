import AppError from '@shared/errors/AppError';
import Tag from '@modules/tags/infra/typeorm/entities/Tag';

import { inject, injectable } from 'tsyringe';

import ITagRepository from '@modules/tags/repositories/ITagRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowTagService {
  constructor(
    @inject('TagsRepository')
    private tagRepository: ITagRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Tag> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new AppError('PUBLICO ALVO não encontrado');
    }
    return tag;
  }
}

export default ShowTagService;
