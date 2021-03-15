import AppError from '@shared/errors/AppError';
import Publico from '@modules/publicos/infra/typeorm/entities/Publico';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IPublicoRepository from '@modules/publicos/repositories/IPublicoRepository';

interface IRequest {
  id: string;
  nome: string;
}
@injectable()
class UpdatePublicoService {
  constructor(
    @inject('PublicosRepository')
    private publicoRepository: IPublicoRepository,
  ) {}

  public async execute({ id, nome }: IRequest): Promise<Publico> {
    const publico = await this.publicoRepository.findById(id);
    if (!publico) {
      throw new AppError('PUBLICO ALVO não encontrado');
    }

    publico.nome = nome;
    publico.slug = slug(nome);

    await this.publicoRepository.save(publico);
    return publico;
  }
}

export default UpdatePublicoService;
