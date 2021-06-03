import AppError from '@shared/errors/AppError';
import Tag from '@modules/tags/infra/typeorm/entities/Tag';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ITagRepository from '@modules/tags/repositories/ITagRepository';

interface IRequest {
  id: string;
  nome: string;
  status: boolean;
}
@injectable()
class UpdateTagService {
  constructor(
    @inject('TagsRepository')
    private tagRepository: ITagRepository,
  ) {}

  public async execute({ id, nome, status }: IRequest): Promise<Tag> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new AppError('TAG não encontrado');
    }

    tag.nome = nome;
    tag.slug = slug(nome);
    tag.status = status;

    await this.tagRepository.save(tag);
    return tag;
  }
}

export default UpdateTagService;
