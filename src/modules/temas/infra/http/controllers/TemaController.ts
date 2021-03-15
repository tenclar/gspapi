import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateTemaService from '@modules/temas/services/CreateTemaService';
import ShowTemaService from '@modules/temas/services/ShowTemaService';
import ListTemaService from '@modules/temas/services/ListTemaService';
import UpdateTemaService from '@modules/temas/services/UpdateTemaService';

export default class TemaController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, status, slug } = request.body;
    const CreateTema = container.resolve(CreateTemaService);
    const tema = await CreateTema.execute({ nome, status, slug });
    return response.json({ publico: classToClass(tema) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showTema = container.resolve(ShowTemaService);
    const tema = await showTema.execute({ id });
    return response.json({ tema: classToClass(tema) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { nome } = request.query;
    const listTema = await container.resolve(ListTemaService);
    const tema = await listTema.execute({ nome: String(nome) });
    return response.json({ tema: classToClass(tema) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome } = request.body;
    const updateTema = container.resolve(UpdateTemaService);

    const tema = await updateTema.execute({
      id,
      nome,
    });

    return response.json({ tema: classToClass(tema) });
  }
}
