import { Repository, getRepository, Raw } from 'typeorm';
import IServicosRepository from '@modules/servicos/repositories/IServicosRepository';
import ICreateServicoDTO from '@modules/servicos/dtos/ICreateServicoDTO';
import Servico from '../entities/Servico';

class ServicosRepository implements IServicosRepository {
  private ormRepository: Repository<Servico>;

  constructor() {
    this.ormRepository = getRepository(Servico);
  }

  async findById(id: string): Promise<Servico | undefined> {
    const servico = await this.ormRepository.findOne(id);
    return servico;
  }

  async findByTitulo(titulo: string): Promise<Servico | undefined> {
    const servico = await this.ormRepository.findOne({
      where: { titulo },
    });
    return servico;
  }

  async findAll(): Promise<Servico[]> {
    const servicos = await this.ormRepository.find();
    return servicos;
  }

  async findAllLikeTitulo(titulo: string): Promise<Servico[]> {
    const lista = await this.ormRepository.find({
      where: { titulo: Raw(alias => `${alias} ILIKE '%${titulo}%'`) },
    });
    return lista;
  }

  async findJoinAll(): Promise<Servico[]> {
    const lista = await this.ormRepository.find({
      relations: ['publicos'],
    });
    return lista;
  }

  async create(servicoData: ICreateServicoDTO): Promise<Servico> {
    const servico = this.ormRepository.create(servicoData);
    await this.ormRepository.save(servico);
    return servico;
  }

  public async save(servico: Servico): Promise<Servico> {
    return this.ormRepository.save(servico);
  }
}

export default ServicosRepository;
