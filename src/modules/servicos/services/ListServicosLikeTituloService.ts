import { injectable, inject } from 'tsyringe';

import Servicos from '@modules/servicos/infra/typeorm/entities/Servico';
import IServicosRepository from '@modules/servicos/repositories/IServicosRepository';

interface IRequest {
  titulo: string;
}
@injectable()
class ListProviderService {
  constructor(
    @inject('ServicosRepository')
    private servicosRepository: IServicosRepository,
  ) {}

  public async execute({ titulo }: IRequest): Promise<Servicos[]> {
    const servicos = await this.servicosRepository.findAllLikeTitulo(titulo);

    return servicos;
  }
}

export default ListProviderService;
