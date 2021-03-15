import Servico from '@modules/servicos/infra/typeorm/entities/Servico';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';
import IServicosRepository from '../repositories/IServicosRepository';

interface IPublico {
  publico_id: string;
}

interface IRequest {
  titulo: string;
  informacao: string;
  orgao_id: string;
  categoria_id: string;
  publicos: IPublico[];
}
@injectable()
class CreateServicoService {
  constructor(
    @inject('ServicosRepository')
    private servicosRepository: IServicosRepository,
  ) {}

  public async execute({
    titulo,
    informacao,
    categoria_id,
    orgao_id,
    publicos,
  }: IRequest): Promise<Servico> {
    const checkServicoExists = await this.servicosRepository.findByTitulo(
      titulo,
    );

    if (checkServicoExists) {
      throw new AppError('Titulo already used.');
    }

    const servico = await this.servicosRepository.create({
      titulo,
      slug: slug(titulo),
      informacao,
      orgao_id,
      categoria_id,
      publicos,
    });
    await this.servicosRepository.save(servico);

    return servico;
  }
}
export default CreateServicoService;
