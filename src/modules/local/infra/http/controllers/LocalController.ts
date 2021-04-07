import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateLocalService from '@modules/local/services/CreateLocalService';
import ShowLocalService from '@modules/local/services/ShowLocalService';
import ListLocalService from '@modules/local/services/ListLocalService';
import UpdateLocalService from '@modules/local/services/UpdateLocalService';

export default class LocalController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, cidade_id, orgao_id, conteudo } = request.body;
    const CreateLocal = container.resolve(CreateLocalService);
    const local = await CreateLocal.execute({
      nome,
      cidade_id,
      orgao_id,
      conteudo,
    });
    return response.json({ local: classToClass(local) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showLocal = container.resolve(ShowLocalService);
    const local = await showLocal.execute({ id });
    return response.json({ local: classToClass(local) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { nome } = request.query;
    const listLocal = await container.resolve(ListLocalService);
    const local = await listLocal.execute({ nome: String(nome) });
    return response.json({ local: classToClass(local) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;
    const { id, nome, orgao_id, cidade_id, conteudo, status } = request.body;
    const updateLocal = container.resolve(UpdateLocalService);

    const local = await updateLocal.execute({
      id,
      nome,
      orgao_id,
      cidade_id,
      conteudo,
      status,
    });

    return response.json({ local: classToClass(local) });
  }
}
