import Servico from '@modules/servicos/infra/typeorm/entities/Servico';
import AppError from '@shared/errors/AppError';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';
import IServicosRepository from '../repositories/IServicosRepository';

interface IPublico {
  publico_id: string;
}

interface ILocal {
  local_id: string;
}

interface IPraca {
  praca_id: string;
}

interface ITema {
  tema_id: string;
}

interface IEtapa {
  titulo: string;
  slug: string;
  informacao: string;
}

interface IRequest {
  titulo: string;
  slug: string;
  informacao: string;
  orgao_id: string;
  categoria_id: string;
  publicos: IPublico[];
  locais: ILocal[];
  pracas: IPraca[];
  temas: ITema[];
  etapas: IEtapa[];
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
    locais,
    pracas,
    temas,
    etapas,
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
      locais,
      pracas,
      temas,
      etapas,
    });
    await this.servicosRepository.save(servico);

    return servico;
  }
}
export default CreateServicoService;
