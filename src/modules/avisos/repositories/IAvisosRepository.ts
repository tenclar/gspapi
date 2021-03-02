import ICreateAvisoDTO from '@modules/avisos/dtos/ICreateAvisoDTO';
import Aviso from '@modules/avisos/infra/typeorm/entities/Aviso';

export default interface IAvisoRepository {
  create(data: ICreateAvisoDTO): Promise<Aviso>;
  save(aviso: Aviso): Promise<Aviso | undefined>;
  findById(id: string): Promise<Aviso | undefined>;
  findByTitulo(titulo: string): Promise<Aviso | undefined>;
  findAllLikeTitulo(titulo?: string): Promise<Aviso[]>;
  findAll(): Promise<Aviso[]>;
}
