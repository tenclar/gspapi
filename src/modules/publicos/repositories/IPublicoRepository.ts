import ICreatePublicoDTO from '@modules/publicos/dtos/ICreatePublicoDTO';
import Publico from '@modules/publicos/infra/typeorm/entities/Publico';

export default interface IPublicoRepository {
  create(data: ICreatePublicoDTO): Promise<Publico>;
  save(local: Publico): Promise<Publico | undefined>;
  findById(id: string): Promise<Publico | undefined>;
  findByNome(nome: string): Promise<Publico | undefined>;
  findAllLikeNome(nome: string): Promise<Publico[]>;
  findAll(): Promise<Publico[]>;
}
