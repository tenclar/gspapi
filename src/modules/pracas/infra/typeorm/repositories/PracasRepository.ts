import { Repository, getRepository, Raw } from 'typeorm';
import IPracaRepository from '@modules/pracas/repositories/IPracasRepository';
import ICreatePracaDTO from '@modules/pracas/dtos/ICreatePracaDTO';

import Praca from '@modules/pracas/infra/typeorm/entities/Praca';

class PracasRepository implements IPracaRepository {
  private ormRepository: Repository<Praca>;

  constructor() {
    this.ormRepository = getRepository(Praca);
  }

  async findById(id: string): Promise<Praca | undefined> {
    const praca = await this.ormRepository.findOne(id);
    return praca;
  }

  async findByNome(nome: string): Promise<Praca | undefined> {
    const praca = await this.ormRepository.findOne({
      where: { nome },
    });
    return praca;
  }

  async findAllLikeNome(nome: string): Promise<Praca[]> {
    const listacategorias = await this.ormRepository.find({
      where: { nome: Raw(alias => `${alias} ILIKE '%${nome}%'`) },
    });
    return listacategorias;
  }

  async findAll(): Promise<Praca[]> {
    const pracas = await this.ormRepository.find();
    return pracas;
  }

  async create(pracaData: ICreatePracaDTO): Promise<Praca> {
    const praca = this.ormRepository.create(pracaData);
    await this.ormRepository.save(praca);
    return praca;
  }

  public async save(praca: Praca): Promise<Praca> {
    return this.ormRepository.save(praca);
  }
}

export default PracasRepository;
