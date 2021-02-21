import { injectable, inject } from 'tsyringe';

import Cidade from '@modules/cidades/infra/typeorm/entities/Cidade';
import ICidadesRepository from '@modules/cidades/repositories/ICidadesRepository';

@injectable()
class ListCidadesService {
  constructor(
    @inject('CidadesRepository')
    private cidadesRepository: ICidadesRepository,
  ) {}

  public async execute(): Promise<Cidade[]> {
    const cidades = await this.cidadesRepository.findAll();

    return cidades;
  }
}

export default ListCidadesService;
