import { injectable, inject } from 'tsyringe';

import Cidade from '@modules/cidades/infra/typeorm/entities/Cidade';
import ICidadesRepository from '@modules/cidades/repositories/ICidadesRepository';

interface IRequest {
  nome: string;
}
@injectable()
class ListCidadesService {
  constructor(
    @inject('CidadesRepository')
    private cidadesRepository: ICidadesRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Cidade[]> {
    const cidades = await this.cidadesRepository.findAllLikeNome(nome);

    return cidades;
  }
}

export default ListCidadesService;
