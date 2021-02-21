import { injectable, inject } from 'tsyringe';

import Local from '@modules/local/infra/typeorm/entities/Local';
import ILocalRepository from '@modules/local/repositories/ILocalRepository';

@injectable()
class ListLocalService {
  constructor(
    @inject('LocalRepository')
    private localRepository: ILocalRepository,
  ) {}

  public async execute(): Promise<Local[]> {
    const local = await this.localRepository.findAll();

    return local;
  }
}

export default ListLocalService;
