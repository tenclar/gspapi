import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateCidadesService from '@modules/cidades/services/CreateCidadesService';
import ShowCidadesService from '@modules/cidades/services/ShowCidadesService';
import ListCidadesService from '@modules/cidades/services/ListCidadesService';
import UpdateCidadesService from '@modules/cidades/services/UpdateCidadesService';

export default class CidadeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, status } = request.body;
    const CreateCidade = container.resolve(CreateCidadesService);
    const cidade = await CreateCidade.execute({ nome, status });
    return response.json({ cidade: classToClass(cidade) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCidade = container.resolve(ShowCidadesService);
    const cidade = await showCidade.execute({ id });
    return response.json({ cidade: classToClass(cidade) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { nome } = request.query;
    const listCidades = await container.resolve(ListCidadesService);
    const cidades = await listCidades.execute({ nome: String(nome) });
    return response.json({ cidades: classToClass(cidades) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, status } = request.body;
    const updateCidades = container.resolve(UpdateCidadesService);

    const cidade = await updateCidades.execute({
      id,
      nome,
      status,
    });

    return response.json({ cidade: classToClass(cidade) });
  }
}
