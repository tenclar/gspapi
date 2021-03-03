import { injectable, inject } from 'tsyringe';

import Orgao from '@modules/orgaos/infra/typeorm/entities/Orgaos';
import IOrgaosRepository from '@modules/orgaos/repositories/IOrgaosRepository';

interface IRequest {
  nome: string;
}

@injectable()
class ListOrgaosService {
  constructor(
    @inject('OrgaosRepository')
    private orgaosRepository: IOrgaosRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Orgao[]> {
    const orgaos = await this.orgaosRepository.findAllLikeNome(nome);

    return orgaos;
  }
}

export default ListOrgaosService;
