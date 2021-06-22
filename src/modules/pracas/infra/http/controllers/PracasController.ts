import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreatePracasService from '@modules/pracas/services/CreatePracasService';
import ShowPracasService from '@modules/pracas/services/ShowPracasService';
import ListPracasService from '@modules/pracas/services/ListPracasService';
import ListPracasLikeNomeService from '@modules/pracas/services/ListPracasLikeNomeService';
import UpdatePracasService from '@modules/pracas/services/UpdatePracasService';

export default class PracaController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, status, centrais } = request.body;
    const CreatePraca = container.resolve(CreatePracasService);
    const praca = await CreatePraca.execute({ nome, status, centrais });
    return response.json({ praca: classToClass(praca) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showPraca = container.resolve(ShowPracasService);
    const praca = await showPraca.execute({ id });
    return response.json({ praca: classToClass(praca) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { nome } = request.query;
    let pracas = null;
    if (nome) {
      const listPracas = await container.resolve(ListPracasLikeNomeService);
      pracas = await listPracas.execute({ nome: String(nome) });
    } else {
      const listPracas = await container.resolve(ListPracasService);
      pracas = await listPracas.execute();
    }

    return response.json({ pracas: classToClass(pracas) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, status, centrais } = request.body;
    const updatePracas = container.resolve(UpdatePracasService);

    const praca = await updatePracas.execute({
      id,
      nome,
      status,
      centrais,
    });

    return response.json({ praca: classToClass(praca) });
  }
}
