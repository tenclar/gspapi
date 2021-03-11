import { Repository, getRepository, Raw } from 'typeorm';
import ITemaRepository from '@modules/temas/repositories/ITemaRepository';
import ICreateTemaDTO from '@modules/temas/dtos/ICreateTemaDTO';

import Tema from '@modules/temas/infra/typeorm/entities/Tema';

class TemaRepository implements ITemaRepository {
  private ormRepository: Repository<Tema>;

  constructor() {
    this.ormRepository = getRepository(Tema);
  }

  async findById(id: string): Promise<Tema | undefined> {
    const tema = await this.ormRepository.findOne(id);
    return tema;
  }

  async findByNome(nome: string): Promise<Tema | undefined> {
    const tema = await this.ormRepository.findOne({
      where: { nome },
    });
    return tema;
  }

  async findAll(): Promise<Tema[]> {
    const tema = await this.ormRepository.find();
    return tema;
  }

  async findAllLikeNome(nome: string): Promise<Tema[]> {
    const lista = await this.ormRepository.find({
      where: { nome: Raw(alias => `${alias} ILIKE '%${nome}%'`) },
    });
    return lista;
  }

  async create(temaData: ICreateTemaDTO): Promise<Tema> {
    const tema = this.ormRepository.create(temaData);
    await this.ormRepository.save(tema);
    return tema;
  }

  public async save(tema: Tema): Promise<Tema> {
    return this.ormRepository.save(tema);
  }
}

export default TemaRepository;
