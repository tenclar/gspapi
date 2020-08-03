import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateServicoService from '@modules/servicos/services/CreateServicosService';
import ListServicoService from '@modules/servicos/services/ListServicosService';

export default class ServicosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { titulo, servico_id } = request.body;

    const createServico = container.resolve(CreateServicoService);
    const servico = await createServico.execute({
      titulo,
      servico_id,
    });

    return response.json({ servico: classToClass(servico) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listServicos = await container.resolve(ListServicoService);
    const servicos = await listServicos.execute();
    return response.json({ servicos: classToClass(servicos) });
  }
}
