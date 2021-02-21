import AppError from '@shared/errors/AppError';
import Cidade from '@modules/cidades/infra/typeorm/entities/Cidade';

import { inject, injectable } from 'tsyringe';

import ICidadesRepository from '@modules/cidades/repositories/ICidadesRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowCidadesService {
  constructor(
    @inject('CidadesRepository')
    private cidadesRepository: ICidadesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Cidade> {
    const cidade = await this.cidadesRepository.findById(id);
    if (!cidade) {
      throw new AppError('Cidade not Found');
    }
    return cidade;
  }
}

export default ShowCidadesService;
