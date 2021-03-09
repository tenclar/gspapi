import { injectable, inject } from 'tsyringe';

import Superiores from '@modules/superiores/infra/typeorm/entities/InstituicaoSuperior';
import ISuperioresRepository from '@modules/superiores/repositories/ISuperioresRepository';

interface IRequest {
  nome: string;
}
@injectable()
class ListSuperioresService {
  constructor(
    @inject('SuperioresRepository')
    private superioresRepository: ISuperioresRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Superiores[]> {
    //    const superiores = await this.superioresRepository.findAll();
    const superiores = await this.superioresRepository.findAllLikeNome(nome);

    return superiores;
  }
}

export default ListSuperioresService;
