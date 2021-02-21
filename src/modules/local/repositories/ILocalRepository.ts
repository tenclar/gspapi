import ICreateLocalDTO from '@modules/local/dtos/ICreateLocalDTO';
import Local from '@modules/local/infra/typeorm/entities/Local';

export default interface ILocalRepository {
  create(data: ICreateLocalDTO): Promise<Local>;
  save(local: Local): Promise<Local | undefined>;
  findById(id: string): Promise<Local | undefined>;
  findByNome(nome: string): Promise<Local | undefined>;
  findAll(): Promise<Local[]>;
}
