import Superiore from '@modules/superiores/infra/typeorm/entities/InstituicaoSuperior';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ISuperioresRepository from '../repositories/ISuperioresRepository';

interface IRequest {
  nome: string;
}

@injectable()
class CreateSuperioresService {
  constructor(
    @inject('SuperioresRepository')
    private superioresRepository: ISuperioresRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Superiore> {
    const checkSuperioresExists = await this.superioresRepository.findByNome(
      nome,
    );

    if (checkSuperioresExists) {
      throw new AppError('Superiore Already used.');
    }
    const superiore = await this.superioresRepository.create({
      nome,
      slug: slug(nome),
    });
    await this.superioresRepository.save(superiore);
    return superiore;
  }
}

export default CreateSuperioresService;
