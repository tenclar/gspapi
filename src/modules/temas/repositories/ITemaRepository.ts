import ICreateTemaDTO from '@modules/temas/dtos/ICreateTemaDTO';
import Tema from '@modules/temas/infra/typeorm/entities/Tema';

export default interface ITemaRepository {
  create(data: ICreateTemaDTO): Promise<Tema>;
  save(tema: Tema): Promise<Tema | undefined>;
  findById(id: string): Promise<Tema | undefined>;
  findByNome(nome: string): Promise<Tema | undefined>;
  findAllLikeNome(nome: string): Promise<Tema[]>;
  findAll(): Promise<Tema[]>;
}
