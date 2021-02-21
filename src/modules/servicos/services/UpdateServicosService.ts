import AppError from '@shared/errors/AppError';
import Servico from '@modules/servicos/infra/typeorm/entities/Servico';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IServicosRepository from '@modules/servicos/repositories/IServicosRepository';

interface IRequest {
  id: string;

  titulo: string;
  informacao: string;
  orgao_id: string;
  categoria_id: string;
}
@injectable()
class UpdateServicosService {
  constructor(
    @inject('ServicosRepository')
    private servicosRepository: IServicosRepository,
  ) {}

  public async execute({
    id,
    titulo,
    informacao,
    orgao_id,
    categoria_id,
  }: IRequest): Promise<Servico> {
    const servico = await this.servicosRepository.findById(id);
    if (!servico) {
      throw new AppError('Servico not Found');
    }

    servico.titulo = titulo;
    servico.slug = slug(titulo);
    servico.orgao_id = orgao_id;
    servico.categoria_id = categoria_id;
    servico.informacao = informacao;

    await this.servicosRepository.save(servico);
    return servico;
  }
}

export default UpdateServicosService;
