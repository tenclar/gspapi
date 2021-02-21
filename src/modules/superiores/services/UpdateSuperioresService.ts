import AppError from '@shared/errors/AppError';
import Superiore from '@modules/superiores/infra/typeorm/entities/InstituicaoSuperior';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ISuperioresRepository from '@modules/superiores/repositories/ISuperioresRepository';

interface IRequest {
  id: string;
  nome: string;
}
@injectable()
class UpdateSuperioresService {
  constructor(
    @inject('SuperioresRepository')
    private superioresRepository: ISuperioresRepository,
  ) {}

  public async execute({ id, nome }: IRequest): Promise<Superiore> {
    const superiore = await this.superioresRepository.findById(id);
    if (!superiore) {
      throw new AppError('Superiore not Found');
    }

    superiore.nome = nome;
    superiore.slug = slug(nome);

    await this.superioresRepository.save(superiore);
    return superiore;
  }
}

export default UpdateSuperioresService;
