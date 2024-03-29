import { injectable, inject } from 'tsyringe';

import Aviso from '@modules/avisos/infra/typeorm/entities/Aviso';
import IAvisosRepository from '@modules/avisos/repositories/IAvisosRepository';

@injectable()
class ListAvisosService {
  constructor(
    @inject('AvisosRepository')
    private avisosRepository: IAvisosRepository,
  ) {}

  public async execute(): Promise<Aviso[]> {
    const avisos = await this.avisosRepository.findAll();

    return avisos;
  }
}

export default ListAvisosService;
