import { Repository, getRepository, Raw } from 'typeorm';
import ICentralRepository from '@modules/centrais/repositories/ICentraisRepository';
import ICreateCentralDTO from '@modules/centrais/dtos/ICreateCentralDTO';

import Central from '@modules/centrais/infra/typeorm/entities/Central';

class CentraisRepository implements ICentralRepository {
  private ormRepository: Repository<Central>;

  constructor() {
    this.ormRepository = getRepository(Central);
  }

  async findById(id: string): Promise<Central | undefined> {
    const central = await this.ormRepository.findOne(id);
    return central;
  }

  async findByNome(nome: string): Promise<Central | undefined> {
    const central = await this.ormRepository.findOne({
      where: { nome },
    });
    return central;
  }

  async findAllLikeNome(nome: string): Promise<Central[]> {
    const listacategorias = await this.ormRepository.find({
      where: { nome: Raw(alias => `${alias} ILIKE '%${nome}%'`) },
    });
    return listacategorias;
  }

  async findAll(): Promise<Central[]> {
    const centrais = await this.ormRepository.find();
    return centrais;
  }

  async create(centralData: ICreateCentralDTO): Promise<Central> {
    const central = this.ormRepository.create(centralData);
    await this.ormRepository.save(central);
    return central;
  }

  public async save(central: Central): Promise<Central> {
    return this.ormRepository.save(central);
  }
}

export default CentraisRepository;
