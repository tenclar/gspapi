import { injectable, inject } from 'tsyringe';

import Aviso from '@modules/avisos/infra/typeorm/entities/Aviso';
import IAvisosRepository from '@modules/avisos/repositories/IAvisosRepository';

interface IRequest {
  titulo?: string;
}

@injectable()
class ListAvisosService {
  constructor(
    @inject('AvisosRepository')
    private avisosRepository: IAvisosRepository,
  ) {}

  public async execute({ titulo }: IRequest): Promise<Aviso[]> {
    const avisos = await this.avisosRepository.findAllLikeTitulo(titulo);

    return avisos;
  }
}

export default ListAvisosService;
