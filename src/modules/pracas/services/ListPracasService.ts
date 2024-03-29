import { injectable, inject } from 'tsyringe';

import Praca from '@modules/pracas/infra/typeorm/entities/Praca';
import IPracasRepository from '@modules/pracas/repositories/IPracasRepository';

@injectable()
class ListPracasService {
  constructor(
    @inject('PracasRepository')
    private pracasRepository: IPracasRepository,
  ) {}

  public async execute(): Promise<Praca[]> {
    const pracas = await this.pracasRepository.findAll();

    return pracas;
  }
}

export default ListPracasService;
