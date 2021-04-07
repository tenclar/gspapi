import { injectable, inject } from 'tsyringe';

import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';
import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListCategoriasService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: ICategoriasRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Categoria[]> {
    /*
    let categorias = await this.cacheProvider.recover<Categoria[]>(
      `providers-list:${categoria_id}`,
    );

     */

    // if (!categorias) {
    const categorias = await this.categoriasRepository.findAll();

    // await this.cacheProvider.save(`providers-list:${categoria_id}`, categorias);
    // }

    return categorias;
  }
}

export default ListCategoriasService;
