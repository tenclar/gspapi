import AppError from '@shared/errors/AppError';
import Central from '@modules/centrais/infra/typeorm/entities/Central';

import { inject, injectable } from 'tsyringe';

import ICentraisRepository from '@modules/centrais/repositories/ICentraisRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowCentraisService {
  constructor(
    @inject('CentraisRepository')
    private centraisRepository: ICentraisRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Central> {
    const central = await this.centraisRepository.findById(id);
    if (!central) {
      throw new AppError('Central not Found');
    }
    return central;
  }
}

export default ShowCentraisService;
