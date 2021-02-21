import AppError from '@shared/errors/AppError';
import Local from '@modules/local/infra/typeorm/entities/Local';

import { inject, injectable } from 'tsyringe';

import ILocalRepository from '@modules/local/repositories/ILocalRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowLocalService {
  constructor(
    @inject('LocalRepository')
    private localRepository: ILocalRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Local> {
    const local = await this.localRepository.findById(id);
    if (!local) {
      throw new AppError('Local not Found');
    }
    return local;
  }
}

export default ShowLocalService;
