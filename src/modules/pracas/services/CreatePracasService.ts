import Praca from '@modules/pracas/infra/typeorm/entities/Praca';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IPracasRepository from '../repositories/IPracasRepository';

interface ICentral {
  id: string;
}

interface IRequest {
  nome: string;
  status: boolean;
  centrais: ICentral[];
}

@injectable()
class CreatePracasService {
  constructor(
    @inject('PracasRepository')
    private pracasRepository: IPracasRepository,
  ) {}

  public async execute({ nome, status, centrais }: IRequest): Promise<Praca> {
    const checkPracasExists = await this.pracasRepository.findByNome(nome);

    if (checkPracasExists) {
      throw new AppError('Praca Already used.');
    }
    const praca = await this.pracasRepository.create({
      nome,
      slug: slug(nome),
      status,
      centrais,
    });
    await this.pracasRepository.save(praca);
    return praca;
  }
}

export default CreatePracasService;
