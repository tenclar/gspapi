import AppError from '@shared/errors/AppError';
import Cidade from '@modules/cidades/infra/typeorm/entities/Cidade';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ICidadesRepository from '@modules/cidades/repositories/ICidadesRepository';

interface IRequest {
  id: string;
  nome: string;
}
@injectable()
class UpdateCidadesService {
  constructor(
    @inject('CidadesRepository')
    private cidadesRepository: ICidadesRepository,
  ) {}

  public async execute({ id, nome }: IRequest): Promise<Cidade> {
    const cidade = await this.cidadesRepository.findById(id);
    if (!cidade) {
      throw new AppError('Cidade not Found');
    }

    cidade.nome = nome;
    cidade.slug = slug(nome);

    await this.cidadesRepository.save(cidade);
    return cidade;
  }
}

export default UpdateCidadesService;
