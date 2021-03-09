import { injectable, inject } from 'tsyringe';

import Praca from '@modules/pracas/infra/typeorm/entities/Praca';
import IPracasRepository from '@modules/pracas/repositories/IPracasRepository';

interface IRequest {
  nome: string;
}
@injectable()
class ListPracasService {
  constructor(
    @inject('PracasRepository')
    private pracasRepository: IPracasRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Praca[]> {
    const pracas = await this.pracasRepository.findAllLikeNome(nome);

    return pracas;
  }
}

export default ListPracasService;
