import AppError from '@shared/errors/AppError';
import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository';

interface IRequest {
  id: string;
  categoria_id?: string;
  titulo: string;
}
@injectable()
class UpdateCategoriasService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: ICategoriasRepository,
  ) {}

  public async execute({
    id,
    titulo,
    categoria_id,
  }: IRequest): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findById(id);
    if (!categoria) {
      throw new AppError('Categoria not Found');
    }

    categoria.titulo = titulo;
    categoria.slug = slug(titulo);
    if (categoria_id) categoria.categoria_id = categoria_id;
    if (!categoria_id) categoria.categoria_id = null;
    await this.categoriasRepository.save(categoria);
    return categoria;
  }
}

export default UpdateCategoriasService;
