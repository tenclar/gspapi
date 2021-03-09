import Central from '@modules/centrais/infra/typeorm/entities/Central';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ICentraisRepository from '../repositories/ICentraisRepository';

interface IRequest {
  nome: string;
  status: boolean;
}

@injectable()
class CreateCentraisService {
  constructor(
    @inject('CentraisRepository')
    private centraisRepository: ICentraisRepository,
  ) {}

  public async execute({ nome, status }: IRequest): Promise<Central> {
    const checkCentraisExists = await this.centraisRepository.findByNome(nome);

    if (checkCentraisExists) {
      throw new AppError('Central Already used.');
    }
    const central = await this.centraisRepository.create({
      nome,
      slug: slug(nome),
      status,
    });
    await this.centraisRepository.save(central);
    return central;
  }
}

export default CreateCentraisService;
