import { uuid } from 'uuidv4';
import ILocalRepository from '@modules/local/repositories/ILocalRepository';
import ICreateLocalDTO from '@modules/local/dtos/ICreateLocalDTO';

import Local from '@modules/local/infra/typeorm/entities/Local';

class FakeLocalRepository implements ILocalRepository {
  private local: Local[] = [];

  async findById(id: string): Promise<Local | undefined> {
    const localFind = this.local.find(u => u.id === id);
    return localFind;
  }

  async findByNome(nome: string): Promise<Local | undefined> {
    const localFind = this.local.find(u => u.nome === nome);

    return localFind;
  }

  public async findAll(): Promise<Local[]> {
    const { local } = this;
    return local;
  }

  async create(localData: ICreateLocalDTO): Promise<Local> {
    const local = new Local();
    Object.assign(local, { id: uuid() }, localData);
    this.local.push(local);
    return local;
  }

  public async save(local: Local): Promise<Local> {
    const findIndex = this.local.findIndex(
      findLocal => findLocal.id === local.id,
    );
    this.local[findIndex] = local;
    return local;
  }
}
export default FakeLocalRepository;
