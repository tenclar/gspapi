import AppError from '@shared/errors/AppError';
import Tema from '@modules/temas/infra/typeorm/entities/Tema';

import { inject, injectable } from 'tsyringe';

import ITemaRepository from '@modules/temas/repositories/ITemaRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowTemaService {
  constructor(
    @inject('TemasRepository')
    private temaRepository: ITemaRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Tema> {
    const tema = await this.temaRepository.findById(id);
    if (!tema) {
      throw new AppError('PUBLICO ALVO não encontrado');
    }
    return tema;
  }
}

export default ShowTemaService;
