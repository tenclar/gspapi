import Tema from '@modules/temas/infra/typeorm/entities/Tema';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import ITemaRepository from '../repositories/ITemaRepository';

interface IRequest {
  nome: string;
  status: boolean;
}

@injectable()
class CreateTemaService {
  constructor(
    @inject('TemasRepository')
    private temasRepository: ITemaRepository,
  ) {}

  public async execute({ nome, status }: IRequest): Promise<Tema> {
    const checkTemaExists = await this.temasRepository.findByNome(nome);

    if (checkTemaExists) {
      throw new AppError('TEMA já está sendo usado.');
    }
    const tema = await this.temasRepository.create({
      nome,
      slug: slug(nome),
      status,
    });
    await this.temasRepository.save(tema);
    return tema;
  }
}

export default CreateTemaService;
