import AppError from '@shared/errors/AppError';
import Praca from '@modules/pracas/infra/typeorm/entities/Praca';

import { inject, injectable } from 'tsyringe';

import IPracasRepository from '@modules/pracas/repositories/IPracasRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowPracasService {
  constructor(
    @inject('PracasRepository')
    private pracasRepository: IPracasRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Praca> {
    const praca = await this.pracasRepository.findById(id);
    if (!praca) {
      throw new AppError('Praca not Found');
    }
    return praca;
  }
}

export default ShowPracasService;
