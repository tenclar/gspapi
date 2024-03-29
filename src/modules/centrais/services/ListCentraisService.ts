import { injectable, inject } from 'tsyringe';

import Central from '@modules/centrais/infra/typeorm/entities/Central';
import ICentraisRepository from '@modules/centrais/repositories/ICentraisRepository';

@injectable()
class ListCentraisService {
  constructor(
    @inject('CentraisRepository')
    private centraisRepository: ICentraisRepository,
  ) {}

  public async execute(): Promise<Central[]> {
    const centrais = await this.centraisRepository.findAll();

    return centrais;
  }
}

export default ListCentraisService;
