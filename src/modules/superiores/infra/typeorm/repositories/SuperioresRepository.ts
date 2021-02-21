import { Repository, getRepository } from 'typeorm';
import ISuperioresRepository from '@modules/superiores/repositories/ISuperioresRepository';
import ICreateSuperioresDTO from '@modules/superiores/dtos/ICreateSuperioresDTO';

import Superior from '@modules/superiores/infra/typeorm/entities/InstituicaoSuperior';

class SuperioresRepository implements ISuperioresRepository {
  private ormRepository: Repository<Superior>;

  constructor() {
    this.ormRepository = getRepository(Superior);
  }

  async findById(id: string): Promise<Superior | undefined> {
    const superior = await this.ormRepository.findOne(id);
    return superior;
  }

  async findByNome(nome: string): Promise<Superior | undefined> {
    const superior = await this.ormRepository.findOne({
      where: { nome },
    });
    return superior;
  }

  async findAll(): Promise<Superior[]> {
    const superiores = await this.ormRepository.find();
    return superiores;
  }

  async create(superiorData: ICreateSuperioresDTO): Promise<Superior> {
    const superior = this.ormRepository.create(superiorData);
    await this.ormRepository.save(superior);
    return superior;
  }

  public async save(cidade: Superior): Promise<Superior> {
    return this.ormRepository.save(cidade);
  }
}

export default SuperioresRepository;
