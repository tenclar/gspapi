import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateCentraisService from '@modules/centrais/services/CreateCentraisService';
import ShowCentraisService from '@modules/centrais/services/ShowCentraisService';
import ListCentraisService from '@modules/centrais/services/ListCentraisService';
import ListCentraisLikeNomeService from '@modules/centrais/services/ListCentraisLikeNomeService';
import UpdateCentraisService from '@modules/centrais/services/UpdateCentraisService';

export default class CentralController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, status } = request.body;
    const CreateCentral = container.resolve(CreateCentraisService);
    const central = await CreateCentral.execute({ nome, status });
    return response.json({ central: classToClass(central) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCentral = container.resolve(ShowCentraisService);
    const central = await showCentral.execute({ id });
    return response.json({ central: classToClass(central) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { nome } = request.query;
    let centrais = null;

    if (nome) {
      const listcentrais = await container.resolve(ListCentraisLikeNomeService);
      centrais = await listcentrais.execute({ nome: String(nome) });
    } else {
      const listCentrais = await container.resolve(ListCentraisService);
      centrais = await listCentrais.execute();
    }

    return response.json({ centrais: classToClass(centrais) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, status } = request.body;
    const updateCentrais = container.resolve(UpdateCentraisService);

    const central = await updateCentrais.execute({
      id,
      nome,
      status,
    });

    return response.json({ central: classToClass(central) });
  }
}
