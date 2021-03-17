import AppError from '@shared/errors/AppError';
import Servico from '@modules/servicos/infra/typeorm/entities/Servico';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IServicosRepository from '@modules/servicos/repositories/IServicosRepository';
import IPublicosRepository from '@modules/publicos/repositories/IPublicoRepository';

interface IPublico {
  publico_id: string;
}

interface ILocal {
  locais_id: string;
}

interface IPraca {
  id: string;
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
  id: string;
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
class UpdateServicosService {
  constructor(
    @inject('ServicosRepository')
    private servicosRepository: IServicosRepository,
    @inject('PublicosRepository')
    private publicosRepository: IPublicosRepository,
  ) {}

  public async execute({
    id,
    titulo,
    informacao,
    orgao_id,
    categoria_id,
    publicos,
    locais,
    pracas,
    temas,
    etapas,
  }: IRequest): Promise<Servico> {
    const servico = await this.servicosRepository.findById(id);
    if (!servico) {
      throw new AppError('Servico not Found');
    }

    /*  const existentPublicos = await this.publicosRepository.findAllById(
      publicos,
    ); */

    servico.titulo = titulo;
    servico.slug = slug(titulo);
    servico.orgao_id = orgao_id;
    servico.categoria_id = categoria_id;
    servico.informacao = informacao;

    servico.publicos = [...servico.publicos, ...publicos];
    /*  servico.locais = [...servico.locais, ...locais];
    servico.pracas = [...servico.pracas, ...pracas];
    servico.temas = [...servico.temas, ...temas];
    servico.etapas = [...servico.etapas, ...etapas];
 */
    await this.servicosRepository.save(servico);
    return servico;
  }
}

export default UpdateServicosService;
