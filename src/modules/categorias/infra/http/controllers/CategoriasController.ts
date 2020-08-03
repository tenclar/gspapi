import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateCategoriaService from '@modules/categorias/services/CreateCategoriasService';
import ListCategoriaService from '@modules/categorias/services/ListCategoriasService';

export default class CategoriasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { titulo, categoria_id } = request.body;

    const createCategoria = container.resolve(CreateCategoriaService);
    const categoria = await createCategoria.execute({
      titulo,
      categoria_id,
    });

    return response.json({ categoria: classToClass(categoria) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCategorias = await container.resolve(ListCategoriaService);
    const categorias = await listCategorias.execute();
    return response.json({ categorias: classToClass(categorias) });
  }
}
