import { injectable, inject } from 'tsyringe';

import Tema from '@modules/temas/infra/typeorm/entities/Tema';
import ITemaRepository from '@modules/temas/repositories/ITemaRepository';

interface IRequest {
  nome: string;
}
@injectable()
class ListTemaService {
  constructor(
    @inject('TemasRepository')
    private temaRepository: ITemaRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Tema[]> {
    const tema = await this.temaRepository.findAllLikeNome(nome);

    return tema;
  }
}

export default ListTemaService;
