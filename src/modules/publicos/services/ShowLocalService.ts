import AppError from '@shared/errors/AppError';
import Publico from '@modules/publicos/infra/typeorm/entities/Publico';

import { inject, injectable } from 'tsyringe';

import IPublicoRepository from '@modules/publicos/repositories/IPublicoRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowPublicoService {
  constructor(
    @inject('publicoRepository')
    private localRepository: IPublicoRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Publico> {
    const publico = await this.localRepository.findById(id);
    if (!publico) {
      throw new AppError('PUBLICO ALVO não encontrado');
    }
    return publico;
  }
}

export default ShowPublicoService;
