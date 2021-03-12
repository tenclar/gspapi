import Tema from '@modules/temas/infra/typeorm/entities/Tema';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ITemaRepository from '../repositories/ITemaRepository';

interface IRequest {
  nome: string;
  slug: string;
  status: boolean;
}

@injectable()
class CreateTemaService {
  constructor(
    @inject('TemaRepository')
    private temaRepository: ITemaRepository,
  ) {}

  public async execute({ nome, slug, status }: IRequest): Promise<Tema> {
    const checkTemaExists = await this.temaRepository.findByNome(nome);

    if (checkTemaExists) {
      throw new AppError('TEMA já está sendo usado.');
    }
    const tema = await this.temaRepository.create({
      nome,
      slug: slug(nome),
      status,
    });
    await this.temaRepository.save(tema);
    return tema;
  }
}

export default CreateTemaService;
