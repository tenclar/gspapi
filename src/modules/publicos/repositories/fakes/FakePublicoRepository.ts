import { uuid } from 'uuidv4';
import IPublicoRepository from '@modules/publicos/repositories/IPublicoRepository';
import ICreatePublicoDTO from '@modules/publicos/dtos/ICreatePublicoDTO';

import Publico from '@modules/publicos/infra/typeorm/entities/Publico';

class FakePublicoRepository implements IPublicoRepository {
  private publico: Publico[] = [];

  async findById(id: string): Promise<Publico | undefined> {
    const publicoFind = this.publico.find(u => u.id === id);
    return publicoFind;
  }

  async findByNome(nome: string): Promise<Publico | undefined> {
    const publicoFind = this.publico.find(u => u.nome === nome);

    return publicoFind;
  }

  public async findAll(): Promise<Publico[]> {
    const { publico } = this;
    return publico;
  }

  public async findAllLikeNome(nome: string): Promise<Publico[]> {
    const publico = this.publico.filter(
      u => u.nome.toLowerCase().indexOf(nome.toLocaleLowerCase()) > -1,
    );
    return publico;
  }

  async create(publicoData: ICreatePublicoDTO): Promise<Publico> {
    const publico = new Publico();
    Object.assign(publico, { id: uuid() }, publicoData);
    this.publico.push(publico);
    return publico;
  }

  public async save(publico: Publico): Promise<Publico> {
    const findIndex = this.publico.findIndex(
      findpublico => findpublico.id === publico.id,
    );
    this.publico[findIndex] = publico;
    return publico;
  }
}
export default FakePublicoRepository;
