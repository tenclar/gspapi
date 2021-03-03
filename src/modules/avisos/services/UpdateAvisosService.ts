import AppError from '@shared/errors/AppError';
import Aviso from '@modules/avisos/infra/typeorm/entities/Aviso';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IAvisosRepository from '@modules/avisos/repositories/IAvisosRepository';

interface IRequest {
  id: string;
  titulo: string;
  conteudo?: string;
  imagem?: string;
  status: boolean;
}
@injectable()
class UpdateAvisosService {
  constructor(
    @inject('AvisosRepository')
    private avisosRepository: IAvisosRepository,
  ) {}

  public async execute({
    id,
    titulo,
    conteudo,
    imagem,
    status,
  }: IRequest): Promise<Aviso> {
    const aviso = await this.avisosRepository.findById(id);
    if (!aviso) {
      throw new AppError('AVISO not Found');
    }

    aviso.titulo = titulo;
    aviso.slug = slug(titulo);
    aviso.status = status;
    if (conteudo) aviso.conteudo = conteudo;
    if (imagem) aviso.imagem = imagem;

    await this.avisosRepository.save(aviso);
    return aviso;
  }
}

export default UpdateAvisosService;
