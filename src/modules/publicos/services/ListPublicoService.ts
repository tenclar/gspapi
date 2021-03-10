import { injectable, inject } from 'tsyringe';

import Publico from '@modules/publicos/infra/typeorm/entities/Publico';
import IPublicoRepository from '@modules/publicos/repositories/IPublicoRepository';

interface IRequest {
  nome: string;
}
@injectable()
class ListPublicoService {
  constructor(
    @inject('publicoRepository')
    private publicoRepository: IPublicoRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Publico[]> {
    const publico = await this.publicoRepository.findAllLikeNome(nome);

    return publico;
  }
}

export default ListPublicoService;
