import AppError from '@shared/errors/AppError';
import Servico from '@modules/servicos/infra/typeorm/entities/Servico';

import { inject, injectable } from 'tsyringe';

import IServicosRepository from '@modules/servicos/repositories/IServicosRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowServicosService {
  constructor(
    @inject('ServicosRepository')
    private servicosRepository: IServicosRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Servico> {
    const servico = await this.servicosRepository.findById(id);
    if (!servico) {
      throw new AppError('Servico not Found');
    }
    return servico;
  }
}

export default ShowServicosService;
