import { injectable, inject } from 'tsyringe';

import Servicos from '@modules/servicos/infra/typeorm/entities/Servico';
import IServicosRepository from '@modules/servicos/repositories/IServicosRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  servico_id: string;
}
@injectable()
class ListProviderService {
  constructor(
    @inject('ServicosRepository')
    private servicosRepository: IServicosRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Servicos[]> {
    /*
    let categorias = await this.cacheProvider.recover<Categoria[]>(
      `providers-list:${categoria_id}`,
    );

     */

    // if (!categorias) {
    const servicos = await this.servicosRepository.findAll();

    // await this.cacheProvider.save(`providers-list:${categoria_id}`, categorias);
    // }

    return servicos;
  }
}

export default ListProviderService;
