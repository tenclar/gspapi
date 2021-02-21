import ICreateCidadeDTO from '@modules/cidades/dtos/ICreateCidadeDTO';
import Cidade from '@modules/cidades/infra/typeorm/entities/Cidade';

export default interface ICidadeRepository {
  create(data: ICreateCidadeDTO): Promise<Cidade>;
  save(cidade: Cidade): Promise<Cidade | undefined>;
  findById(id: string): Promise<Cidade | undefined>;
  findByNome(nome: string): Promise<Cidade | undefined>;
  findAll(): Promise<Cidade[]>;
}
