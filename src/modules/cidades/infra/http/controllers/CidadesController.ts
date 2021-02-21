import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateCidadesService from '@modules/cidades/services/CreateCidadesService';
import { Request } from 'aws-sdk';

export default class CidadeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;
    const CreateCidade = container.resolve(CreateCidadesService);
    const cidade = await CreateCidade.execute({ nome });
    return response.json({ cidade: classToClass(cidade) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCidade = container.resolve(SwhoCidadeService);
  }
}
