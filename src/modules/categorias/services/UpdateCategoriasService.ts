import AppError from '@shared/errors/AppError';
import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository';

interface IRequest {
  id: string;
  titulo: string;
  categoria_id?: string;
  status: boolean;
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
    status,
  }: IRequest): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findById(id);
    if (!categoria) {
      throw new AppError('CATEGORIA não encontrada');
    }

    categoria.titulo = titulo;
    categoria.slug = slug(titulo);
    categoria.status = status;

    if (categoria_id) categoria.categoria_id = categoria_id;
    categoria.categoria_id = categoria_id || null;
    await this.categoriasRepository.save(categoria);
    return categoria;
  }
}

export default UpdateCategoriasService;
