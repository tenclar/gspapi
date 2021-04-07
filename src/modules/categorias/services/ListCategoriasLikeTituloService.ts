import { injectable, inject } from 'tsyringe';

import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';
import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository';

interface IRequest {
  titulo: string;
}
@injectable()
class ListCategoriasService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: ICategoriasRepository,
  ) {}

  public async execute({ titulo }: IRequest): Promise<Categoria[]> {
    const categorias = await this.categoriasRepository.findAllLikeTitulo(
      titulo,
    );

    return categorias;
  }
}

export default ListCategoriasService;
