import AppError from '@shared/errors/AppError';
import Praca from '@modules/pracas/infra/typeorm/entities/Praca';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IPracasRepository from '@modules/pracas/repositories/IPracasRepository';

interface IRequest {
  id: string;
  nome: string;
  status: boolean;
}
@injectable()
class UpdatePracasService {
  constructor(
    @inject('PracasRepository')
    private pracasRepository: IPracasRepository,
  ) {}

  public async execute({ id, nome, status }: IRequest): Promise<Praca> {
    const praca = await this.pracasRepository.findById(id);
    if (!praca) {
      throw new AppError('Praca not Found');
    }

    praca.nome = nome;
    praca.slug = slug(nome);
    praca.status = status;

    await this.pracasRepository.save(praca);
    return praca;
  }
}

export default UpdatePracasService;
