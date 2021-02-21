import AppError from '@shared/errors/AppError';
import Superiore from '@modules/superiores/infra/typeorm/entities/InstituicaoSuperior';

import { inject, injectable } from 'tsyringe';

import ISuperioresRepository from '@modules/superiores/repositories/ISuperioresRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowSuperioresService {
  constructor(
    @inject('SuperioresRepository')
    private superioresRepository: ISuperioresRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Superiore> {
    const superiore = await this.superioresRepository.findById(id);
    if (!superiore) {
      throw new AppError('Superiore not Found');
    }
    return superiore;
  }
}

export default ShowSuperioresService;
