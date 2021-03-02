import { uuid } from 'uuidv4';
import IServicosRepository from '@modules/servicos/repositories/IServicosRepository';
import ICreateServicoDTO from '@modules/servicos/dtos/ICreateServicoDTO';

import Servico from '@modules/servicos/infra/typeorm/entities/Servico';

class FakeServicosRepository implements IServicosRepository {
  private servicos: Servico[] = [];

  async findById(id: string): Promise<Servico | undefined> {
    const servicoFind = this.servicos.find(u => u.id === id);
    return servicoFind;
  }

  async findByTitulo(titulo: string): Promise<Servico | undefined> {
    const servicoFind = this.servicos.find(u => u.titulo === titulo);

    return servicoFind;
  }

  async findAllLikeTitulo(titulo: string): Promise<Servico[]> {
    const users = this.servicos.filter(
      u => u.titulo.toLowerCase().indexOf(titulo.toLocaleLowerCase()) > -1,
    );

    return users;
  }

  public async findAll(): Promise<Servico[]> {
    const { servicos } = this;
    return servicos;
  }

  async create(servicoData: ICreateServicoDTO): Promise<Servico> {
    const servico = new Servico();
    Object.assign(servico, { id: uuid() }, servicoData);
    this.servicos.push(servico);
    return servico;
  }

  public async save(servico: Servico): Promise<Servico> {
    const findIndex = this.servicos.findIndex(
      findServico => findServico.id === servico.id,
    );
    this.servicos[findIndex] = servico;
    return servico;
  }
}
export default FakeServicosRepository;
