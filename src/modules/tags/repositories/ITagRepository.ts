import ICreateTagDTO from '@modules/tags/dtos/ICreateTagDTO';
import Tag from '@modules/tags/infra/typeorm/entities/Tag';

export default interface ITagRepository {
  create(data: ICreateTagDTO): Promise<Tag>;
  save(tag: Tag): Promise<Tag | undefined>;
  findById(id: string): Promise<Tag | undefined>;
  findByNome(nome: string): Promise<Tag | undefined>;
  findAllLikeNome(nome: string): Promise<Tag[]>;
  findAll(): Promise<Tag[]>;
}
