import Publico from '@modules/publicos/infra/typeorm/entities/Publico';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IPublicoRepository from '../repositories/IPublicoRepository';

interface IRequest {
  nome: string;
  status: boolean;
}

@injectable()
class CreatePublicoService {
  constructor(
    @inject('PublicosRepository')
    private publicoRepository: IPublicoRepository,
  ) {}

  public async execute({ nome, status }: IRequest): Promise<Publico> {
    const checkPublicoExists = await this.publicoRepository.findByNome(nome);

    if (checkPublicoExists) {
      throw new AppError('Local Already used.');
    }
    const publico = await this.publicoRepository.create({
      nome,
      slug: slug(nome),
      status,
    });
    await this.publicoRepository.save(publico);
    return publico;
  }
}

export default CreatePublicoService;
