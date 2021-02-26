import Aviso from '@modules/avisos/infra/typeorm/entities/Aviso';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IAvisosRepository from '../repositories/IAvisosRepository';

interface IRequest {
  titulo: string;
  conteudo?: string;
  imagem: string;
  status: boolean;
}

@injectable()
class CreateAvisosService {
  constructor(
    @inject('AvisosRepository')
    private avisosRepository: IAvisosRepository,
  ) {}

  public async execute({
    titulo,
    conteudo,
    imagem,
    status,
  }: IRequest): Promise<Aviso> {
    const checkAvisosExists = await this.avisosRepository.findByTitulo(titulo);

    if (checkAvisosExists) {
      throw new AppError('Aviso Already used.');
    }
    const aviso = await this.avisosRepository.create({
      titulo,
      conteudo,
      slug: slug(titulo),
      imagem,
      status,
    });
    await this.avisosRepository.save(aviso);
    return aviso;
  }
}

export default CreateAvisosService;
