import Praca from '@modules/pracas/infra/typeorm/entities/Praca';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IPracasRepository from '../repositories/IPracasRepository';

interface IRequest {
  nome: string;
  status: boolean;
}

@injectable()
class CreatePracasService {
  constructor(
    @inject('PracasRepository')
    private pracasRepository: IPracasRepository,
  ) {}

  public async execute({ nome, status }: IRequest): Promise<Praca> {
    const checkPracasExists = await this.pracasRepository.findByNome(nome);

    if (checkPracasExists) {
      throw new AppError('Praca Already used.');
    }
    const praca = await this.pracasRepository.create({
      nome,
      slug: slug(nome),
      status,
    });
    await this.pracasRepository.save(praca);
    return praca;
  }
}

export default CreatePracasService;
