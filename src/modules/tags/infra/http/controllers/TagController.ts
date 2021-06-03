import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateTagService from '@modules/tags/services/CreateTagService';
import ShowTagService from '@modules/tags/services/ShowTagService';
import ListTagService from '@modules/tags/services/ListTagService';
import ListTagLikeNomeService from '@modules/tags/services/ListTagLikeNomeService';
import UpdateTagService from '@modules/tags/services/UpdateTagService';

export default class TagController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, status } = request.body;
    const CreateTag = container.resolve(CreateTagService);
    const tag = await CreateTag.execute({ nome, status });
    return response.json({ publico: classToClass(tag) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showTag = container.resolve(ShowTagService);
    const tag = await showTag.execute({ id });
    return response.json({ tags: classToClass(tag) });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { nome } = request.query;
    let tag = null;
    if (nome) {
      const listTag = await container.resolve(ListTagLikeNomeService);
      tag = await listTag.execute({ nome: String(nome) });
    } else {
      const listTag = await container.resolve(ListTagService);
      tag = await listTag.execute();
    }
    return response.json({ tags: classToClass(tag) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, status } = request.body;
    const updateTag = container.resolve(UpdateTagService);

    const tag = await updateTag.execute({
      id,
      nome,
      status,
    });

    return response.json({ tag: classToClass(tag) });
  }
}
