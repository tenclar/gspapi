import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateCategoriaService from '@modules/categorias/services/CreateCategoriasService';
import ShowCategoriaService from '@modules/categorias/services/ShowCategoriasService';
import UpdateCategoriaService from '@modules/categorias/services/UpdateCategoriasService';
import ListCategoriaLikeTituloService from '@modules/categorias/services/ListCategoriasLikeTituloService';
import ListCategoriasService from '@modules/categorias/services/ListCategoriasService';

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
    const { titulo } = request.query;
    let categorias = [];
    if (titulo) {
      const listCategorias = await container.resolve(
        ListCategoriaLikeTituloService,
      );
      categorias = await listCategorias.execute({ titulo: String(titulo) });
    } else {
      const listCategorias = await container.resolve(ListCategoriasService);
      categorias = await listCategorias.execute();
    }

    return response.json({ categorias: classToClass(categorias) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { titulo, categoria_id } = request.body;

    const updateCategoria = container.resolve(UpdateCategoriaService);

    const categoria = await updateCategoria.execute({
      id,
      titulo,
      categoria_id,
    });
    // delete categoria.categoria;
    console.log(classToClass(categoria));
    return response.json({ categoria: classToClass(categoria) });
  }
}
