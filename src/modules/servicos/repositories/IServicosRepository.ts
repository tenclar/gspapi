import ICreateServicoDTO from '@modules/servicos/dtos/ICreateServicoDTO';
import Servico from '@modules/servicos/infra/typeorm/entities/Servico';

export default interface IServicosReposotory {
  create(data: ICreateServicoDTO): Promise<Servico>;
  save(servico: Servico): Promise<Servico>;
  findById(id: string): Promise<Servico | undefined>;
  findByTitulo(titulo: string): Promise<Servico | undefined>;
  findAllLikeTitulo(titulo: string): Promise<Servico[]>;
  findJoinAll(): Promise<Servico[]>;
  findAll(): Promise<Servico[]>;
}
