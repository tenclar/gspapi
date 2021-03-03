import { Repository, getRepository, Raw } from 'typeorm';
import IOrgaoRepository from '@modules/orgaos/repositories/IOrgaosRepository';
import ICreateOrgaoDTO from '@modules/orgaos/dtos/ICreateOrgaosDTO';

import Orgao from '@modules/orgaos/infra/typeorm/entities/Orgaos';

class OrgaosRepository implements IOrgaoRepository {
  private ormRepository: Repository<Orgao>;

  constructor() {
    this.ormRepository = getRepository(Orgao);
  }

  async findById(id: string): Promise<Orgao | undefined> {
    const orgao = await this.ormRepository.findOne(id);
    return orgao;
  }

  async findByNome(nome: string): Promise<Orgao | undefined> {
    const orgao = await this.ormRepository.findOne({
      where: { nome },
    });
    return orgao;
  }

  async findAll(): Promise<Orgao[]> {
    const orgaos = await this.ormRepository.find();
    return orgaos;
  }

  async findAllLikeNome(nome: string): Promise<Orgao[]> {
    const listaorgaos = await this.ormRepository.find({
      where: { nome: Raw(alias => `${alias} ILIKE '%${nome}%'`) },
    });
    return listaorgaos;
  }

  async create(orgaoData: ICreateOrgaoDTO): Promise<Orgao> {
    const orgao = this.ormRepository.create(orgaoData);
    await this.ormRepository.save(orgao);
    return orgao;
  }

  public async save(orgao: Orgao): Promise<Orgao> {
    return this.ormRepository.save(orgao);
  }
}

export default OrgaosRepository;
