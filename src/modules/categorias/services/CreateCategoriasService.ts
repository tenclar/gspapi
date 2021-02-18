import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ICategoriasRepository from '../repositories/ICategoriasRepository';

interface IRequest {
  titulo: string;
  categoria_id: string;
}
@injectable()
class CreateCategoriaService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: ICategoriasRepository,
  ) {}

  public async execute({ titulo, categoria_id }: IRequest): Promise<Categoria> {
    const checkCategoriaExists = await this.categoriasRepository.findByTituloAndId(
      titulo,
      categoria_id,
    );
    if (checkCategoriaExists) {
      throw new AppError('Titulo already used.');
    }

    const categoria = await this.categoriasRepository.create({
      titulo,
      slug: slug(titulo),
      categoria_id,
    });
    await this.categoriasRepository.save(categoria);

    return categoria;
  }
}
export default CreateCategoriaService;
