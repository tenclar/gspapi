import { uuid } from 'uuidv4';
import IPracasRepository from '@modules/pracas/repositories/IPracasRepository';
import ICreatePracaDTO from '@modules/pracas/dtos/ICreatePracaDTO';

import Praca from '@modules/pracas/infra/typeorm/entities/Praca';

class FakePracasRepository implements IPracasRepository {
  private pracas: Praca[] = [];

  async findById(id: string): Promise<Praca | undefined> {
    const pracaFind = this.pracas.find(u => u.id === id);
    return pracaFind;
  }

  async findByNome(nome: string): Promise<Praca | undefined> {
    const pracaFind = this.pracas.find(u => u.nome === nome);

    return pracaFind;
  }

  public async findAll(): Promise<Praca[]> {
    const { pracas } = this;
    return pracas;
  }

  public async findAllLikeNome(nome: string): Promise<Praca[]> {
    const pracas = this.pracas.filter(
      u => u.nome.toLowerCase().indexOf(nome.toLocaleLowerCase()) > -1,
    );

    return pracas;
  }

  async create(pracaData: ICreatePracaDTO): Promise<Praca> {
    const praca = new Praca();
    Object.assign(praca, { id: uuid() }, pracaData);
    this.pracas.push(praca);
    return praca;
  }

  public async save(praca: Praca): Promise<Praca> {
    const findIndex = this.pracas.findIndex(
      findPraca => findPraca.id === praca.id,
    );
    this.pracas[findIndex] = praca;
    return praca;
  }
}
export default FakePracasRepository;
