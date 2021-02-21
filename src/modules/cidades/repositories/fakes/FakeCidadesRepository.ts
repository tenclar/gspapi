import { uuid } from 'uuidv4';
import ICidadesRepository from '@modules/cidades/repositories/ICidadesRepository';
import ICreateCidadeDTO from '@modules/cidades/dtos/ICreateCidadeDTO';

import Cidade from '@modules/cidades/infra/typeorm/entities/Cidade';

class FakeCidadesRepository implements ICidadesRepository {
  private cidades: Cidade[] = [];

  async findById(id: string): Promise<Cidade | undefined> {
    const cidadeFind = this.cidades.find(u => u.id === id);
    return cidadeFind;
  }

  async findByNome(nome: string): Promise<Cidade | undefined> {
    const cidadeFind = this.cidades.find(u => u.nome === nome);

    return cidadeFind;
  }

  public async findAll(): Promise<Cidade[]> {
    const { cidades } = this;
    return cidades;
  }

  async create(cidadeData: ICreateCidadeDTO): Promise<Cidade> {
    const cidade = new Cidade();
    Object.assign(cidade, { id: uuid() }, cidadeData);
    this.cidades.push(cidade);
    return cidade;
  }

  public async save(cidade: Cidade): Promise<Cidade> {
    const findIndex = this.cidades.findIndex(
      findCidade => findCidade.id === cidade.id,
    );
    this.cidades[findIndex] = cidade;
    return cidade;
  }
}
export default FakeCidadesRepository;
