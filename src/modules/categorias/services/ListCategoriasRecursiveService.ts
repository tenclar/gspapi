import { injectable, inject } from 'tsyringe';

import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';
import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository';

@injectable()
class ListCategoriasService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: ICategoriasRepository,
  ) {}

  public async execute(): Promise<Categoria[]> {
    const categorias = await this.categoriasRepository.findAllRecursive();

    return categorias;
  }
}

export default ListCategoriasService;
