import { injectable, inject } from 'tsyringe';

import Informacao from '@modules/informacoes/infra/typeorm/entities/Informacao';
import IInformacoesRepository from '@modules/informacoes/repositories/IInformacoesRepository';

interface IRequest {
  titulo?: string;
}

@injectable()
class ListInformacoesService {
  constructor(
    @inject('InformacoesRepository')
    private informacoesRepository: IInformacoesRepository,
  ) {}

  public async execute({ titulo }: IRequest): Promise<Informacao[]> {
    const informacoes = await this.informacoesRepository.findAllLikeTitulo(
      titulo,
    );

    return informacoes;
  }
}

export default ListInformacoesService;
