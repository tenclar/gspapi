import AppError from '@shared/errors/AppError';
import Orgao from '@modules/orgaos/infra/typeorm/entities/Orgaos';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IOrgaosRepository from '@modules/orgaos/repositories/IOrgaosRepository';

interface IRequest {
  id: string;
  nome: string;
  superiores_id: string;
}
@injectable()
class UpdateOrgaosService {
  constructor(
    @inject('OrgaosRepository')
    private orgaosRepository: IOrgaosRepository,
  ) {}

  public async execute({ id, nome, superiores_id }: IRequest): Promise<Orgao> {
    const orgao = await this.orgaosRepository.findById(id);
    if (!orgao) {
      throw new AppError('Orgao not Found');
    }

    orgao.nome = nome;
    orgao.slug = slug(nome);
    orgao.superiores_id = superiores_id;

    await this.orgaosRepository.save(orgao);
    return orgao;
  }
}

export default UpdateOrgaosService;
