import { Repository, getRepository, Raw } from 'typeorm';
import ITagRepository from '@modules/tags/repositories/ITagRepository';
import ICreateTagDTO from '@modules/tags/dtos/ICreateTagDTO';

import Tag from '@modules/tags/infra/typeorm/entities/Tag';

class TagRepository implements ITagRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  async findById(id: string): Promise<Tag | undefined> {
    const tag = await this.ormRepository.findOne(id);
    return tag;
  }

  async findByNome(nome: string): Promise<Tag | undefined> {
    const tag = await this.ormRepository.findOne({
      where: { nome },
    });
    return tag;
  }

  async findAll(): Promise<Tag[]> {
    const tag = await this.ormRepository.find();
    return tag;
  }

  async findAllLikeNome(nome: string): Promise<Tag[]> {
    const lista = await this.ormRepository.find({
      where: { nome: Raw(alias => `${alias} ILIKE '%${nome}%'`) },
    });
    return lista;
  }

  async create(tagData: ICreateTagDTO): Promise<Tag> {
    const tag = this.ormRepository.create(tagData);
    await this.ormRepository.save(tag);
    return tag;
  }

  public async save(tag: Tag): Promise<Tag> {
    return this.ormRepository.save(tag);
  }
}

export default TagRepository;
