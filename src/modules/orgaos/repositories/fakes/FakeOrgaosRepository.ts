import { uuid } from 'uuidv4';
import IOrgaosRepository from '@modules/orgaos/repositories/IOrgaosRepository';
import ICreateOrgaoDTO from '@modules/orgaos/dtos/ICreateOrgaosDTO';

import Orgao from '@modules/orgaos/infra/typeorm/entities/Orgaos';

class FakeOrgaosRepository implements IOrgaosRepository {
  private orgaos: Orgao[] = [];

  async findById(id: string): Promise<Orgao | undefined> {
    const orgaoFind = this.orgaos.find(u => u.id === id);
    return orgaoFind;
  }

  async findByNome(nome: string): Promise<Orgao | undefined> {
    const orgaoFind = this.orgaos.find(u => u.nome === nome);

    return orgaoFind;
  }

  public async findAll(): Promise<Orgao[]> {
    const { orgaos } = this;
    return orgaos;
  }

  async create(orgaoData: ICreateOrgaoDTO): Promise<Orgao> {
    const orgao = new Orgao();
    Object.assign(orgao, { id: uuid() }, orgaoData);
    this.orgaos.push(orgao);
    return orgao;
  }

  public async save(orgao: Orgao): Promise<Orgao> {
    const findIndex = this.orgaos.findIndex(
      findOrgao => findOrgao.id === orgao.id,
    );
    this.orgaos[findIndex] = orgao;
    return orgao;
  }
}
export default FakeOrgaosRepository;
