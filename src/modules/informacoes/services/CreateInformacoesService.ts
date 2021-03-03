import Informacao from '@modules/informacoes/infra/typeorm/entities/Informacao';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IInformacoesRepository from '../repositories/IInformacoesRepository';

interface IRequest {
  titulo: string;
  conteudo?: string;
  imagem?: string;
  status: boolean;
}

@injectable()
class CreateInformacoesService {
  constructor(
    @inject('InformacoesRepository')
    private informacoesRepository: IInformacoesRepository,
  ) {}

  public async execute({
    titulo,
    conteudo,
    imagem,
    status,
  }: IRequest): Promise<Informacao> {
    const checkInformacoesExists = await this.informacoesRepository.findByTitulo(
      titulo,
    );

    if (checkInformacoesExists) {
      throw new AppError('INFORMAÇÃO já está em uso.');
    }
    const informacao = await this.informacoesRepository.create({
      titulo,
      conteudo,
      slug: slug(titulo),
      imagem,
      status,
    });
    await this.informacoesRepository.save(informacao);
    return informacao;
  }
}

export default CreateInformacoesService;
