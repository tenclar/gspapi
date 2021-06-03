import Tag from '@modules/tags/infra/typeorm/entities/Tag';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ITagRepository from '../repositories/ITagRepository';

interface IRequest {
  nome: string;
  status: boolean;
}

@injectable()
class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagRepository,
  ) {}

  public async execute({ nome, status }: IRequest): Promise<Tag> {
    const checkTagExists = await this.tagsRepository.findByNome(nome);

    if (checkTagExists) {
      throw new AppError('TEMA já está sendo usado.');
    }
    const tag = await this.tagsRepository.create({
      nome,
      slug: slug(nome),
      status,
    });
    await this.tagsRepository.save(tag);
    return tag;
  }
}

export default CreateTagService;
