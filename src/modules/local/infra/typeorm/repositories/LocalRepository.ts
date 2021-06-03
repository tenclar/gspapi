import { Repository, getRepository, Raw } from 'typeorm';
import ILocalRepository from '@modules/local/repositories/ILocalRepository';
import ICreateLocalDTO from '@modules/local/dtos/ICreateLocalDTO';

import Local from '@modules/local/infra/typeorm/entities/Local';

class LocalRepository implements ILocalRepository {
  private ormRepository: Repository<Local>;

  constructor() {
    this.ormRepository = getRepository(Local);
  }

  async findById(id: string): Promise<Local | undefined> {
    const local = await this.ormRepository.findOne(id, {
      relations: ['cidade', 'orgao'],
    });
    return local;
  }

  async findByNome(nome: string): Promise<Local | undefined> {
    const local = await this.ormRepository.findOne({
      where: { nome },
    });
    return local;
  }

  async findAll(): Promise<Local[]> {
    const local = await this.ormRepository.find();
    return local;
  }

  async findAllLikeNome(nome: string): Promise<Local[]> {
    const lista = await this.ormRepository.find({
      where: { nome: Raw(alias => `${alias} ILIKE '%${nome}%'`) },
    });
    return lista;
  }

  async create(localData: ICreateLocalDTO): Promise<Local> {
    const local = this.ormRepository.create(localData);
    await this.ormRepository.save(local);
    return local;
  }

  public async save(local: Local): Promise<Local> {
    return this.ormRepository.save(local);
  }
}

export default LocalRepository;
