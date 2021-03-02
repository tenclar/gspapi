import { uuid } from 'uuidv4';
import IAvisosRepository from '@modules/avisos/repositories/IAvisosRepository';
import ICreateAvisoDTO from '@modules/avisos/dtos/ICreateAvisoDTO';

import Aviso from '@modules/avisos/infra/typeorm/entities/Aviso';

class FakeAvisosRepository implements IAvisosRepository {
  private avisos: Aviso[] = [];

  async findById(id: string): Promise<Aviso | undefined> {
    const avisoFind = this.avisos.find(u => u.id === id);
    return avisoFind;
  }

  async findByTitulo(titulo: string): Promise<Aviso | undefined> {
    const avisoFind = this.avisos.find(u => u.titulo === titulo);

    return avisoFind;
  }

  public async findAll(): Promise<Aviso[]> {
    const { avisos } = this;
    return avisos;
  }

  async create(avisoData: ICreateAvisoDTO): Promise<Aviso> {
    const aviso = new Aviso();
    Object.assign(aviso, { id: uuid() }, avisoData);
    this.avisos.push(aviso);
    return aviso;
  }

  public async save(aviso: Aviso): Promise<Aviso> {
    const findIndex = this.avisos.findIndex(
      findAviso => findAviso.id === aviso.id,
    );
    this.avisos[findIndex] = aviso;
    return aviso;
  }

  public async findAllLikeTitulo(titulo: string): Promise<Aviso[]> {
    const avisos = this.avisos.filter(u => u.titulo === titulo);

    return avisos;
  }
}
export default FakeAvisosRepository;
