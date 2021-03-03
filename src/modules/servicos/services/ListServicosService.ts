import { injectable, inject } from 'tsyringe';

import Servicos from '@modules/servicos/infra/typeorm/entities/Servico';
import IServicosRepository from '@modules/servicos/repositories/IServicosRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  titulo: string;
}
@injectable()
class ListProviderService {
  constructor(
    @inject('ServicosRepository')
    private servicosRepository: IServicosRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ titulo }: IRequest): Promise<Servicos[]> {
    /*
    let servicos = await this.cacheProvider.recover<Servico[]>(
      `providers-list:${servico_id}`,
    );

     */

    // if (!servicos) {
    // const servicos = await this.servicosRepository.findAll();
    const servicos = await this.servicosRepository.findAllLikeTitulo(titulo);
    // await this.cacheProvider.save(`providers-list:${servico_id}`, servicos);
    // }

    return servicos;
  }
}

export default ListProviderService;
