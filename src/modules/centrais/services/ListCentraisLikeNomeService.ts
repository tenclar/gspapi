import { injectable, inject } from 'tsyringe';

import Central from '@modules/centrais/infra/typeorm/entities/Central';
import ICentraisRepository from '@modules/centrais/repositories/ICentraisRepository';

interface IRequest {
  nome: string;
}
@injectable()
class ListCentraisLikeNomeService {
  constructor(
    @inject('CentraisRepository')
    private centraisRepository: ICentraisRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Central[]> {
    const centrais = await this.centraisRepository.findAllLikeNome(nome);

    return centrais;
  }
}

export default ListCentraisLikeNomeService;
