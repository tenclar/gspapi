import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateSuperioresService from '@modules/superiores/services/CreateSuperioresService';
import ShowSuperioreservice from '@modules/superiores/services/ShowSuperioresService';
import ListSuperioresService from '@modules/superiores/services/ListSuperioresService';
import ListSuperioresLikeNomeService from '@modules/superiores/services/ListSuperioresLikeNomeService';
import UpdateSuperioresService from '@modules/superiores/services/UpdateSuperioresService';

export default class SuperioresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;
    const CreateSuperiores = container.resolve(CreateSuperioresService);
    const superior = await CreateSuperiores.execute({ nome });
    return response.json({ superior: classToClass(superior) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showSuperiores = container.resolve(ShowSuperioreservice);
    const instsuperior = await showSuperiores.execute({ id });
    return response.json({ superior: classToClass(instsuperior) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { nome } = request.query;
    let superiores = null;
    if (nome) {
      const listSuperiores = await container.resolve(
        ListSuperioresLikeNomeService,
      );
      superiores = await listSuperiores.execute({ nome: String(nome) });
    } else {
      const listSuperiores = await container.resolve(ListSuperioresService);
      superiores = await listSuperiores.execute();
    }
    return response.json({ superiores: classToClass(superiores) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, status } = request.body;
    const updateSuperiores = container.resolve(UpdateSuperioresService);

    const superior = await updateSuperiores.execute({
      id,
      nome,
      status,
    });

    return response.json({ superior: classToClass(superior) });
  }
}
