import AppError from '@shared/errors/AppError';
import Central from '@modules/centrais/infra/typeorm/entities/Central';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ICentraisRepository from '@modules/centrais/repositories/ICentraisRepository';

interface IRequest {
  id: string;
  nome: string;
  status: boolean;
}
@injectable()
class UpdateCentraisService {
  constructor(
    @inject('CentraisRepository')
    private centraisRepository: ICentraisRepository,
  ) {}

  public async execute({ id, nome, status }: IRequest): Promise<Central> {
    const central = await this.centraisRepository.findById(id);
    if (!central) {
      throw new AppError('Central not Found');
    }

    central.nome = nome;
    central.slug = slug(nome);
    central.status = status;

    await this.centraisRepository.save(central);
    return central;
  }
}

export default UpdateCentraisService;
