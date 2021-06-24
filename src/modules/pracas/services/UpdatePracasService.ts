import AppError from '@shared/errors/AppError';
import Praca from '@modules/pracas/infra/typeorm/entities/Praca';
import slug from '@shared/utils/slug';
import { injectable, inject } from 'tsyringe';

import IPracasRepository from '@modules/pracas/repositories/IPracasRepository';

interface ICentral {
  id: string;
  praca_id: string;
  centrais_id: string;
}
interface IRequest {
  id: string;
  nome: string;
  status: boolean;
  centrais: ICentral[];
}
@injectable()
class UpdatePracasService {
  constructor(
    @inject('PracasRepository')
    private pracasRepository: IPracasRepository,
  ) {}

  public async execute({
    id,
    nome,
    status,
    centrais,
  }: IRequest): Promise<Praca> {
    const praca = await this.pracasRepository.findById(id);
    if (!praca) {
      throw new AppError('Praca not Found');
    }

    praca.nome = nome;
    praca.slug = slug(nome);
    praca.status = status;
    /// const newCentrais = centrais.map(c => ({ centrais_id: c.id }));
    praca.centrais = [...praca.centrais, ...centrais];
    // console.log(praca.centrais);
    // console.log([...praca.centrais, ...centrais]);
    praca.centrais = centrais;
    await this.pracasRepository.save(praca);
    return praca;
  }
}

export default UpdatePracasService;
