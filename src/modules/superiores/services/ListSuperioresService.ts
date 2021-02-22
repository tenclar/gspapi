import { injectable, inject } from 'tsyringe';

import Superiores from '@modules/superiores/infra/typeorm/entities/InstituicaoSuperior';
import ISuperioresRepository from '@modules/superiores/repositories/ISuperioresRepository';

@injectable()
class ListSuperioresService {
  constructor(
    @inject('SuperioresRepository')
    private superioresRepository: ISuperioresRepository,
  ) {}

  public async execute(): Promise<Superiores[]> {
    const superiores = await this.superioresRepository.findAll();

    return superiores;
  }
}

export default ListSuperioresService;
