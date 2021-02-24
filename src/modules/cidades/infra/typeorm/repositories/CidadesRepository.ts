import { Repository, getRepository, Raw } from 'typeorm';
import ICidadeRepository from '@modules/cidades/repositories/ICidadesRepository';
import ICreateCidadeDTO from '@modules/cidades/dtos/ICreateCidadeDTO';

import Cidade from '@modules/cidades/infra/typeorm/entities/Cidade';

class CidadesRepository implements ICidadeRepository {
  private ormRepository: Repository<Cidade>;

  constructor() {
    this.ormRepository = getRepository(Cidade);
  }

  async findById(id: string): Promise<Cidade | undefined> {
    const cidade = await this.ormRepository.findOne(id);
    return cidade;
  }

  async findByNome(nome: string): Promise<Cidade | undefined> {
    const cidade = await this.ormRepository.findOne({
      where: { nome },
    });
    return cidade;
  }


  async findAllLikeNome(nome: string): Promise<Cidade[]> {
    const listacategorias = await this.ormRepository.find({
      where: { nome: Raw(alias => `${alias} ILIKE '%${nome}%'`) },
    });
    return listacategorias;
  }

  async findAll(): Promise<Cidade[]> {
    const cidades = await this.ormRepository.find();
    return cidades;
  }

  async create(cidadeData: ICreateCidadeDTO): Promise<Cidade> {
    const cidade = this.ormRepository.create(cidadeData);
    await this.ormRepository.save(cidade);
    return cidade;
  }

  public async save(cidade: Cidade): Promise<Cidade> {
    return this.ormRepository.save(cidade);
  }
}

export default CidadesRepository;
