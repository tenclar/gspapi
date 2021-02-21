import AppError from '@shared/errors/AppError';
import Orgao from '@modules/orgaos/infra/typeorm/entities/Orgaos';

import { inject, injectable } from 'tsyringe';

import IOrgaosRepository from '@modules/orgaos/repositories/IOrgaosRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowOrgaosService {
  constructor(
    @inject('OrgaosRepository')
    private orgaosRepository: IOrgaosRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Orgao> {
    const orgao = await this.orgaosRepository.findById(id);
    if (!orgao) {
      throw new AppError('Orgao not Found');
    }
    return orgao;
  }
}

export default ShowOrgaosService;
