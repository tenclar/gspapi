import { uuid } from 'uuidv4';
import ITemaRepository from '@modules/temas/repositories/ITemaRepository';
import ICreateTemaDTO from '@modules/temas/dtos/ICreateTemaDTO';

import Tema from '@modules/temas/infra/typeorm/entities/Tema';

class FakeTemaRepository implements ITemaRepository {
  private tema: Tema[] = [];

  async findById(id: string): Promise<Tema | undefined> {
    const temaFind = this.tema.find(u => u.id === id);
    return temaFind;
  }

  async findByNome(nome: string): Promise<Tema | undefined> {
    const temaFind = this.tema.find(u => u.nome === nome);

    return temaFind;
  }

  public async findAll(): Promise<Tema[]> {
    const { tema } = this;
    return tema;
  }

  public async findAllLikeNome(nome: string): Promise<Tema[]> {
    const tema = this.tema.filter(
      u => u.nome.toLowerCase().indexOf(nome.toLocaleLowerCase()) > -1,
    );
    return tema;
  }

  async create(temaData: ICreateTemaDTO): Promise<Tema> {
    const tema = new Tema();
    Object.assign(tema, { id: uuid() }, temaData);
    this.tema.push(tema);
    return tema;
  }

  public async save(tema: Tema): Promise<Tema> {
    const findIndex = this.tema.findIndex(findtema => findtema.id === tema.id);
    this.tema[findIndex] = tema;
    return tema;
  }
}
export default FakeTemaRepository;
