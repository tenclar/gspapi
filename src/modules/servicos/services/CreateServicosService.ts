import Servico from '@modules/servicos/infra/typeorm/entities/Servico';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IServicosRepository from '../repositories/IServicosRepository';

interface IRequest {
  titulo: string;
  informacao: string;
  orgao_id: string;
  categoria_id: string;
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
    });
    await this.servicosRepository.save(servico);
    // await this.cacheProvider.invalidatePrefix('providers-list:*');
    return servico;
  }
}
export default CreateServicoService;
