import AppError from '@shared/errors/AppError';
import Tema from '@modules/temas/infra/typeorm/entities/Tema';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ITemaRepository from '@modules/temas/repositories/ITemaRepository';

interface IRequest {
  id: string;
  nome: string;
}
@injectable()
class UpdateTemaService {
  constructor(
    @inject('temaRepository')
    private temaRepository: ITemaRepository,
  ) {}

  public async execute({ id, nome }: IRequest): Promise<Tema> {
    const tema = await this.temaRepository.findById(id);
    if (!tema) {
      throw new AppError('TEMA não encontrado');
    }

    tema.nome = nome;
    tema.slug = slug(nome);

    await this.temaRepository.save(tema);
    return tema;
  }
}

export default UpdateTemaService;
