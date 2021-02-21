import Cidade from '@modules/cidades/infra/typeorm/entities/Cidade';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ICidadesRepository from '../repositories/ICidadesRepository';

interface IRequest {
  nome: string;
}

@injectable()
class CreateCidadesService {
  constructor(
    @inject('CidadeRepository')
    private cidadesRepository: ICidadesRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Cidade> {
    const checkCidadesExists = await this.cidadesRepository.findByNome(nome);

    if (checkCidadesExists) {
      throw new AppError('Cidade Already used.');
    }
    const cidade = await this.cidadesRepository.create({
      nome,
      slug: slug(nome),
    });
    await this.cidadesRepository.save(cidade);
    return cidade;
  }
}

export default CreateCidadesService;
