import { uuid } from 'uuidv4';
import ISuperiorsRepository from '@modules/superiores/repositories/ISuperioresRepository';
import ICreateSuperiorDTO from '@modules/superiores/dtos/ICreateSuperioresDTO';

import Superior from '@modules/superiores/infra/typeorm/entities/InstituicaoSuperior';

class FakeSuperiorsRepository implements ISuperiorsRepository {
  private superior: Superior[] = [];

  async findById(id: string): Promise<Superior | undefined> {
    const superiorFind = this.superior.find(u => u.id === id);
    return superiorFind;
  }

  async findByNome(nome: string): Promise<Superior | undefined> {
    const superiorFind = this.superior.find(u => u.nome === nome);

    return superiorFind;
  }

  public async findAll(): Promise<Superior[]> {
    const { superior } = this;
    return superior;
  }

  async create(superiorData: ICreateSuperiorDTO): Promise<Superior> {
    const superior = new Superior();
    Object.assign(superior, { id: uuid() }, superiorData);
    this.superior.push(superior);
    return superior;
  }

  public async save(superior: Superior): Promise<Superior> {
    const findIndex = this.superior.findIndex(
      findSuperior => findSuperior.id === superior.id,
    );
    this.superior[findIndex] = superior;
    return superior;
  }
}
export default FakeSuperiorsRepository;
