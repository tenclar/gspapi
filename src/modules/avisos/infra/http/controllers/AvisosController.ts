import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateAvisosService from '@modules/avisos/services/CreateAvisosService';
import ShowAvisosService from '@modules/avisos/services/ShowAvisosService';
import ListAvisosService from '@modules/avisos/services/ListAvisosService';
import ListAvisosLikeTituloService from '@modules/avisos/services/ListAvisosLikeTituloService';
import UpdateAvisosService from '@modules/avisos/services/UpdateAvisosService';

export default class AvisoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { titulo, conteudo, imagem, status } = request.body;
    const CreateAviso = container.resolve(CreateAvisosService);
    const aviso = await CreateAviso.execute({
      titulo,
      conteudo,
      imagem,
      status,
    });
    return response.json({ aviso: classToClass(aviso) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showAviso = container.resolve(ShowAvisosService);
    const aviso = await showAviso.execute({ id });
    return response.json({ aviso: classToClass(aviso) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { titulo } = request.query;
    let avisos = [];
    if (titulo) {
      const listAvisos = await container.resolve(ListAvisosLikeTituloService);
      avisos = await listAvisos.execute({ titulo: String(titulo) });
    } else {
      const listAvisos = await container.resolve(ListAvisosService);
      avisos = await listAvisos.execute();
    }

    return response.json({ avisos: classToClass(avisos) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { titulo, conteudo, imagem, status } = request.body;
    const updateAvisos = container.resolve(UpdateAvisosService);

    const aviso = await updateAvisos.execute({
      id,
      titulo,
      conteudo,
      imagem,
      status,
    });

    return response.json({ aviso: classToClass(aviso) });
  }
}
