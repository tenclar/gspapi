import AppError from '@shared/errors/AppError';
import Aviso from '@modules/avisos/infra/typeorm/entities/Aviso';

import { inject, injectable } from 'tsyringe';

import IAvisosRepository from '@modules/avisos/repositories/IAvisosRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowAvisosService {
  constructor(
    @inject('AvisosRepository')
    private avisosRepository: IAvisosRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Aviso> {
    const aviso = await this.avisosRepository.findById(id);

    if (!aviso) {
      throw new AppError('AVISO not Found');
    }
    return aviso;
  }
}

export default ShowAvisosService;
