import AppError from '@shared/errors/AppError';
import Informacao from '@modules/informacoes/infra/typeorm/entities/Informacao';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IInformacoesRepository from '@modules/informacoes/repositories/IInformacoesRepository';

interface IRequest {
  id: string;
  titulo: string;
  conteudo?: string;
  imagem?: string;
  status: boolean;
}
@injectable()
class UpdateInformacoesService {
  constructor(
    @inject('InformacoesRepository')
    private informacoesRepository: IInformacoesRepository,
  ) {}

  public async execute({
    id,
    titulo,
    conteudo,
    imagem,
    status,
  }: IRequest): Promise<Informacao> {
    const informacao = await this.informacoesRepository.findById(id);
    if (!informacao) {
      throw new AppError('INFORMAÇÃO não encontrada');
    }

    informacao.titulo = titulo;
    informacao.slug = slug(titulo);
    informacao.status = status;
    if (conteudo) informacao.conteudo = conteudo;
    if (imagem) informacao.imagem = imagem;

    await this.informacoesRepository.save(informacao);
    return informacao;
  }
}

export default UpdateInformacoesService;
