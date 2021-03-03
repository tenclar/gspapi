import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateOrgaosService from '@modules/orgaos/services/CreateOrgaosService';
import ShowOrgaoservice from '@modules/orgaos/services/ShowOrgaosService';
import ListOrgaosService from '@modules/orgaos/services/ListOrgaosService';
import UpdateOrgaosService from '@modules/orgaos/services/UpdateOrgaosService';

export default class OrgaosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, superiores_id } = request.body;
    const CreateOrgaos = container.resolve(CreateOrgaosService);
    const orgao = await CreateOrgaos.execute({ nome, superiores_id });
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
    const listOrgaos = await container.resolve(ListOrgaosService);
    const orgaos = await listOrgaos.execute({ nome: String(nome) });
    return response.json({ orgaos: classToClass(orgaos) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;
    const { id, nome, superiores_id } = request.body;
    const updateOrgaos = container.resolve(UpdateOrgaosService);

    const orgao = await updateOrgaos.execute({
      id,
      nome,
      superiores_id,
    });

    return response.json({ orgao: classToClass(orgao) });
  }
}
