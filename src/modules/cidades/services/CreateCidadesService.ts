import Cidade from '@modules/cidades/infra/typeorm/entities/Cidade';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ICidadesRepository from '../repositories/ICidadesRepository';

interface IRequest {
  nome: string;
  status: boolean;
}

@injectable()
class CreateCidadesService {
  constructor(
    @inject('CidadesRepository')
    private cidadesRepository: ICidadesRepository,
  ) {}

  public async execute({ nome, status }: IRequest): Promise<Cidade> {
    const checkCidadesExists = await this.cidadesRepository.findByNome(nome);

    if (checkCidadesExists) {
      throw new AppError('Cidade Already used.');
    }
    const cidade = await this.cidadesRepository.create({
      nome,
      status,
      slug: slug(nome),
    });
    await this.cidadesRepository.save(cidade);
    return cidade;
  }
}

export default CreateCidadesService;
