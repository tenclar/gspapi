import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateOrgaosService from '@modules/orgaos/services/CreateOrgaosService';
import ShowOrgaoservice from '@modules/orgaos/services/ShowOrgaosService';
import ListOrgaosService from '@modules/orgaos/services/ListOrgaosService';
import ListOrgaosLikeNomeService from '@modules/orgaos/services/ListOrgaosLikeNomeService';

import UpdateOrgaosService from '@modules/orgaos/services/UpdateOrgaosService';

export default class OrgaosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, superiores_id, status } = request.body;
    const CreateOrgaos = container.resolve(CreateOrgaosService);
    const orgao = await CreateOrgaos.execute({ nome, superiores_id, status });
    return response.json({ orgao: classToClass(orgao) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showOrgaos = container.resolve(ShowOrgaoservice);
    const orgao = await showOrgaos.execute({ id });
    return response.json({ orgao: classToClass(orgao) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { nome } = request.query;
    let orgaos = null;
    if (nome) {
      const listOrgaos = await container.resolve(ListOrgaosLikeNomeService);
      orgaos = await listOrgaos.execute({ nome: String(nome) });
    } else {
      const listOrgaos = await container.resolve(ListOrgaosService);
      orgaos = await listOrgaos.execute();
    }

    return response.json({ orgaos: classToClass(orgaos) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, superiores_id, status } = request.body;
    const updateOrgaos = container.resolve(UpdateOrgaosService);

    const orgao = await updateOrgaos.execute({
      id,
      nome,
      superiores_id,
      status,
    });

    return response.json({ orgao: classToClass(orgao) });
  }
}
