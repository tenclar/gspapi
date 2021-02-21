import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateServicoService from '@modules/servicos/services/CreateServicosService';
import ListServicoService from '@modules/servicos/services/ListServicosService';
import ShowServicosService from '@modules/servicos/services/ShowServicosService';
import UpdateServicosService from '@modules/servicos/services/UpdateServicosService';

export default class ServicosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { titulo, informacao, orgao_id, categoria_id } = request.body;

    const createServico = container.resolve(CreateServicoService);
    const servico = await createServico.execute({
      titulo,
      informacao,
      orgao_id,
      categoria_id,
    });

    return response.json({ servico: classToClass(servico) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listServicos = await container.resolve(ListServicoService);
    const servicos = await listServicos.execute();
    return response.json({ servicos: classToClass(servicos) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showServico = container.resolve(ShowServicosService);
    const servico = await showServico.execute({ id });
    return response.json({ servico: classToClass(servico) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;
    const { id, titulo, informacao, orgao_id, categoria_id } = request.body;
    const updateServicos = container.resolve(UpdateServicosService);

    const servico = await updateServicos.execute({
      id,
      titulo,
      informacao,
      orgao_id,
      categoria_id,
    });

    return response.json({ servico: classToClass(servico) });
  }
}
