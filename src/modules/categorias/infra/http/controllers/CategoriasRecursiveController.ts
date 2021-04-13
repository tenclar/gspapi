import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import ListCategoriasRecursiveService from '@modules/categorias/services/ListCategoriasRecursiveService';
import ListCategoriasLikeTituloRecursiveService from '@modules/categorias/services/ListCategoriasLikeTituloRecursiveService';

export default class CategoriasRecursiveController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { titulo } = request.query;
    let categorias = [];
    if (titulo) {
      const listCategorias = await container.resolve(
        ListCategoriasLikeTituloRecursiveService,
      );
      categorias = await listCategorias.execute({
        titulo: String(titulo),
      });
    } else {
      const listCategorias = await container.resolve(
        ListCategoriasRecursiveService,
      );
      categorias = await listCategorias.execute();
    }

    return response.json({ categorias: classToClass(categorias) });
  }
}
