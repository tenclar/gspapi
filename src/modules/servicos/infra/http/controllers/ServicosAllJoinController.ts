import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import ListAllJoinServicoService from '@modules/servicos/services/ListAllJoinServicosService';

export default class ServicosAllJoinController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listServicos = await container.resolve(ListAllJoinServicoService);
    const servicos = await listServicos.execute();

    return response.json({ servicos: classToClass(servicos) });
  }
}
