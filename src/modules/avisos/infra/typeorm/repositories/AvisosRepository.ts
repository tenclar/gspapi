import { Repository, getRepository, Raw } from 'typeorm';
import IAvisoRepository from '@modules/avisos/repositories/IAvisosRepository';
import ICreateAvisoDTO from '@modules/avisos/dtos/ICreateAvisoDTO';

import Aviso from '@modules/avisos/infra/typeorm/entities/Aviso';

class AvisosRepository implements IAvisoRepository {
  private ormRepository: Repository<Aviso>;

  constructor() {
    this.ormRepository = getRepository(Aviso);
  }

  async findById(id: string): Promise<Aviso | undefined> {
    const aviso = await this.ormRepository.findOne(id);
    return aviso;
  }

  async findByTitulo(titulo: string): Promise<Aviso | undefined> {
    const aviso = await this.ormRepository.findOne({
      where: { titulo },
    });
    return aviso;
  }

  async findAllLikeTitulo(titulo: string): Promise<Aviso[]> {
    const listaTitulo = await this.ormRepository.find({
      where: { titulo: Raw(alias => `${alias} ILIKE '%${titulo}%'`) },
    });
    return listaTitulo;
  }

  async findAll(): Promise<Aviso[]> {
    const aviso = await this.ormRepository.find();
    return aviso;
  }

  async create(avisoData: ICreateAvisoDTO): Promise<Aviso> {
    const aviso = this.ormRepository.create(avisoData);
    await this.ormRepository.save(aviso);
    return aviso;
  }

  public async save(aviso: Aviso): Promise<Aviso> {
    return this.ormRepository.save(aviso);
  }
}

export default AvisosRepository;
