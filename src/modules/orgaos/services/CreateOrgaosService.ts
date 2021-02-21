import Orgao from '@modules/orgaos/infra/typeorm/entities/Orgaos';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IOrgaosRepository from '../repositories/IOrgaosRepository';

interface IRequest {
  nome: string;
  superiores_id: string;
}

@injectable()
class CreateOrgaosService {
  constructor(
    @inject('OrgaoRepository')
    private orgaosRepository: IOrgaosRepository,
  ) {}

  public async execute({ nome, superiores_id }: IRequest): Promise<Orgao> {
    const checkOrgaosExists = await this.orgaosRepository.findByNome(nome);

    if (checkOrgaosExists) {
      throw new AppError('Orgao Already used.');
    }
    const orgao = await this.orgaosRepository.create({
      nome,
      slug: slug(nome),
      superiores_id,
    });
    await this.orgaosRepository.save(orgao);
    return orgao;
  }
}

export default CreateOrgaosService;
