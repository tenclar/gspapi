import { injectable, inject } from 'tsyringe';

import Servicos from '@modules/servicos/infra/typeorm/entities/Servico';
import IServicosRepository from '@modules/servicos/repositories/IServicosRepository';

@injectable()
class ListAllJoinServicosService {
  constructor(
    @inject('ServicosRepository')
    private servicosRepository: IServicosRepository,
  ) {}

  public async execute(): Promise<Servicos[]> {
    const servicos = await this.servicosRepository.findJoinAll();
    return servicos;
  }
}

export default ListAllJoinServicosService;
