import AppError from '@shared/errors/AppError';
import Informacao from '@modules/informacoes/infra/typeorm/entities/Informacao';

import { inject, injectable } from 'tsyringe';

import IInformacoesRepository from '@modules/informacoes/repositories/IInformacoesRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowInformacoesService {
  constructor(
    @inject('InformacoesRepository')
    private informacoesRepository: IInformacoesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Informacao> {
    const informacao = await this.informacoesRepository.findById(id);

    if (!informacao) {
      throw new AppError('INFORMAÇÃO não encontrada');
    }
    return informacao;
  }
}

export default ShowInformacoesService;
