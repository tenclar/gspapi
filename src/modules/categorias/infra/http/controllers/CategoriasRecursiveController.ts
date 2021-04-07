import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import ListCategoriasRecursiveService from '@modules/categorias/services/ListCategoriasRecursiveService';

export default class CategoriasRecursiveController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategorias = await container.resolve(
      ListCategoriasRecursiveService,
    );
    const categorias = await listCategorias.execute();
    return response.json({ categorias: classToClass(categorias) });
  }
}
