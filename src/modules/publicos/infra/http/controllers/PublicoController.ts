import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreatePublicoService from '@modules/publicos/services/CreatePublicoService';
import ShowPublicoService from '@modules/publicos/services/ShowLocalService';
import ListPublicoService from '@modules/publicos/services/ListLocalService';
import UpdatePublicoService from '@modules/publicos/services/UpdateLocalService';

export default class PublicoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, status, slug } = request.body;
    const CreatePublico = container.resolve(CreatePublicoService);
    const publico = await CreatePublico.execute({ nome, status, slug });
    return response.json({ publico: classToClass(publico) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showPublico = container.resolve(ShowPublicoService);
    const publico = await showPublico.execute({ id });
    return response.json({ publico: classToClass(publico) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { nome } = request.query;
    const listPublico = await container.resolve(ListPublicoService);
    const publico = await listPublico.execute({ nome: String(nome) });
    return response.json({ publico: classToClass(publico) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, status } = request.body;
    const updatePublico = container.resolve(UpdatePublicoService);

    const publico = await updatePublico.execute({
      id,
      nome,
      status,
    });

    return response.json({ publico: classToClass(publico) });
  }
}
