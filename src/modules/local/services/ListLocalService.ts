import { injectable, inject } from 'tsyringe';

import Local from '@modules/local/infra/typeorm/entities/Local';
import ILocalRepository from '@modules/local/repositories/ILocalRepository';

interface IRequest {
  nome: string;
}
@injectable()
class ListLocalService {
  constructor(
    @inject('LocalRepository')
    private localRepository: ILocalRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Local[]> {
    const local = await this.localRepository.findAllLikeNome(nome);

    return local;
  }
}

export default ListLocalService;
