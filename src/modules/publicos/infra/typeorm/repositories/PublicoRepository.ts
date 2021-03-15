import { Repository, getRepository, Raw } from 'typeorm';
import IPublicoRepository from '@modules/publicos/repositories/IPublicoRepository';
import ICreatePublicoDTO from '@modules/publicos/dtos/ICreatePublicoDTO';

import Publico from '@modules/publicos/infra/typeorm/entities/Publico';

class PublicoRepository implements IPublicoRepository {
  private ormRepository: Repository<Publico>;

  constructor() {
    this.ormRepository = getRepository(Publico);
  }

  async findById(id: string): Promise<Publico | undefined> {
    const publico = await this.ormRepository.findOne(id);
    return publico;
  }

  async findByNome(nome: string): Promise<Publico | undefined> {
    const publico = await this.ormRepository.findOne({
      where: { nome },
    });
    return publico;
  }

  async findAll(): Promise<Publico[]> {
    const publico = await this.ormRepository.find();
    return publico;
  }

  async findAllLikeNome(nome: string): Promise<Publico[]> {
    const lista = await this.ormRepository.find({
      where: { nome: Raw(alias => `${alias} ILIKE '%${nome}%'`) },
    });
    return lista;
  }

  async create(publicoData: ICreatePublicoDTO): Promise<Publico> {
    const publico = this.ormRepository.create(publicoData);
    await this.ormRepository.save(publico);
    return publico;
  }

  public async save(publico: Publico): Promise<Publico> {
    return this.ormRepository.save(publico);
  }
}

export default PublicoRepository;
