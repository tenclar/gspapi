import Local from '@modules/local/infra/typeorm/entities/Local';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ILocalRepository from '../repositories/ILocalRepository';

interface IRequest {
  nome: string;
  orgao_id: string;
  cidade_id: string;
  conteudo: string;
  status: boolean;
}

@injectable()
class CreateLocalService {
  constructor(
    @inject('LocalRepository')
    private localRepository: ILocalRepository,
  ) {}

  public async execute({
    nome,
    orgao_id,
    cidade_id,
    conteudo,
    status,
  }: IRequest): Promise<Local> {
    const checkLocalExists = await this.localRepository.findByNome(nome);

    if (checkLocalExists) {
      throw new AppError('Local Already used.');
    }
    const local = await this.localRepository.create({
      nome,
      slug: slug(nome),
      orgao_id,
      cidade_id,
      conteudo,
      status,
    });
    await this.localRepository.save(local);
    return local;
  }
}

export default CreateLocalService;
