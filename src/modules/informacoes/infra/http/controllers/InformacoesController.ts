import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateInformacoesService from '@modules/informacoes/services/CreateInformacoesService';
import ShowInformacoesService from '@modules/informacoes/services/ShowInformacoesService';
import ListInformacoesService from '@modules/informacoes/services/ListInformacoesService';
import UpdateInformacoesService from '@modules/informacoes/services/UpdateInformacoesService';

export default class InformacaoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { titulo, conteudo, imagem, status } = request.body;
    const CreateInformacao = container.resolve(CreateInformacoesService);
    const informacao = await CreateInformacao.execute({
      titulo,
      conteudo,
      imagem,
      status,
    });
    return response.json({ informacao: classToClass(informacao) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showInformacao = container.resolve(ShowInformacoesService);
    const informacao = await showInformacao.execute({ id });
    return response.json({ informacao: classToClass(informacao) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { titulo } = request.query;
    const listInformacoes = await container.resolve(ListInformacoesService);
    const informacoes = await listInformacoes.execute({
      titulo: String(titulo),
    });
    return response.json({ informacoes: classToClass(informacoes) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { titulo, conteudo, imagem, status } = request.body;
    const updateInformacoes = container.resolve(UpdateInformacoesService);

    const informacao = await updateInformacoes.execute({
      id,
      titulo,
      conteudo,
      imagem,
      status,
    });

    return response.json({ informacao: classToClass(informacao) });
  }
}
