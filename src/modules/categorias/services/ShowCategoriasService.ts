import AppError from '@shared/errors/AppError';
import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';

import { injectable, inject } from 'tsyringe';

import ICategoriaRepository from '@modules/categorias/repositories/ICategoriasRepository';

interface IRequest {
  id: string;
}
@injectable()
class ShowProfileService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: ICategoriaRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findByIdRelationCategoria(
      id,
    );
    if (!categoria) {
      throw new AppError('Categoria not Found');
    }

    return categoria;
  }
}

export default ShowProfileService;
