import AppError from '@shared/errors/AppError';
import Local from '@modules/local/infra/typeorm/entities/Local';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ILocalRepository from '@modules/local/repositories/ILocalRepository';

interface IRequest {
  id: string;
  nome: string;
  orgao_id: string;
  cidade_id: string;
}
@injectable()
class UpdateLocalService {
  constructor(
    @inject('LocalRepository')
    private localRepository: ILocalRepository,
  ) {}

  public async execute({
    id,
    nome,
    cidade_id,
    orgao_id,
  }: IRequest): Promise<Local> {
    const local = await this.localRepository.findById(id);
    if (!local) {
      throw new AppError('Local not Found');
    }

    local.nome = nome;
    local.slug = slug(nome);
    local.cidade_id = cidade_id;
    local.orgao_id = orgao_id;

    await this.localRepository.save(local);
    return local;
  }
}

export default UpdateLocalService;
