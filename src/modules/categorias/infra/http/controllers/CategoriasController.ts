import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateCategoriaService from '@modules/categorias/services/CreateCategoriasService';
import ShowCategoriaService from '@modules/categorias/services/ShowCategoriasService';
import UpdateCategoriaService from '@modules/categorias/services/UpdateCategoriasService';
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

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCategoria = container.resolve(ShowCategoriaService);
    const categoria = await showCategoria.execute({ id });
    return response.json(classToClass(categoria));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { titulo = '%' } = request.query;

    const listCategorias = await container.resolve(ListCategoriaService);
    const categorias = await listCategorias.execute({ titulo: String(titulo) });
    return response.json({ categorias: classToClass(categorias) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { titulo, categoria_id } = request.body;
    const updateCategoria = container.resolve(UpdateCategoriaService);

    const user = await updateCategoria.execute({
      id,
      titulo,
      categoria_id,
    });
    // delete user.password;
    return response.json({ categoria: classToClass(user) });
  }
}
