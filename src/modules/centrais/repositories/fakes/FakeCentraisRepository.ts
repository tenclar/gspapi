import { uuid } from 'uuidv4';
import ICentraisRepository from '@modules/centrais/repositories/ICentraisRepository';
import ICreateCentralDTO from '@modules/centrais/dtos/ICreateCentralDTO';

import Central from '@modules/centrais/infra/typeorm/entities/Central';

class FakeCentraisRepository implements ICentraisRepository {
  private centrais: Central[] = [];

  async findById(id: string): Promise<Central | undefined> {
    const centralFind = this.centrais.find(u => u.id === id);
    return centralFind;
  }

  async findByNome(nome: string): Promise<Central | undefined> {
    const centralFind = this.centrais.find(u => u.nome === nome);

    return centralFind;
  }

  public async findAll(): Promise<Central[]> {
    const { centrais } = this;
    return centrais;
  }

  public async findAllLikeNome(nome: string): Promise<Central[]> {
    const centrais = this.centrais.filter(
      u => u.nome.toLowerCase().indexOf(nome.toLocaleLowerCase()) > -1,
    );

    return centrais;
  }

  async create(centralData: ICreateCentralDTO): Promise<Central> {
    const central = new Central();
    Object.assign(central, { id: uuid() }, centralData);
    this.centrais.push(central);
    return central;
  }

  public async save(central: Central): Promise<Central> {
    const findIndex = this.centrais.findIndex(
      findCentral => findCentral.id === central.id,
    );
    this.centrais[findIndex] = central;
    return central;
  }
}
export default FakeCentraisRepository;
