import { injectable, inject } from 'tsyringe';

import Orgao from '@modules/orgaos/infra/typeorm/entities/Orgaos';
import IOrgaosRepository from '@modules/orgaos/repositories/IOrgaosRepository';

@injectable()
class ListOrgaosService {
  constructor(
    @inject('OrgaosRepository')
    private orgaosRepository: IOrgaosRepository,
  ) {}

  public async execute(): Promise<Orgao[]> {
    const orgaos = await this.orgaosRepository.findAll();

    return orgaos;
  }
}

export default ListOrgaosService;
