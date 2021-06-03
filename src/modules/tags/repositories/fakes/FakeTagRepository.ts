import { uuid } from 'uuidv4';
import ITagRepository from '@modules/tags/repositories/ITagRepository';
import ICreateTagDTO from '@modules/tags/dtos/ICreateTagDTO';

import Tag from '@modules/tags/infra/typeorm/entities/Tag';

class FakeTagRepository implements ITagRepository {
  private tag: Tag[] = [];

  async findById(id: string): Promise<Tag | undefined> {
    const tagFind = this.tag.find(u => u.id === id);
    return tagFind;
  }

  async findByNome(nome: string): Promise<Tag | undefined> {
    const tagFind = this.tag.find(u => u.nome === nome);

    return tagFind;
  }

  public async findAll(): Promise<Tag[]> {
    const { tag } = this;
    return tag;
  }

  public async findAllLikeNome(nome: string): Promise<Tag[]> {
    const tag = this.tag.filter(
      u => u.nome.toLowerCase().indexOf(nome.toLocaleLowerCase()) > -1,
    );
    return tag;
  }

  async create(tagData: ICreateTagDTO): Promise<Tag> {
    const tag = new Tag();
    Object.assign(tag, { id: uuid() }, tagData);
    this.tag.push(tag);
    return tag;
  }

  public async save(tag: Tag): Promise<Tag> {
    const findIndex = this.tag.findIndex(findtag => findtag.id === tag.id);
    this.tag[findIndex] = tag;
    return tag;
  }
}
export default FakeTagRepository;
