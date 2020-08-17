import { uuid } from 'uuidv4';
import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository';
import ICreateCategoriaDTO from '@modules/categorias/dtos/ICreateCategoriaDTO';

import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';

class FakeCategoriasRepository implements ICategoriasRepository {
  private categorias: Categoria[] = [];

  async findById(id: string): Promise<Categoria | undefined> {
    const categoriaFind = this.categorias.find(u => u.id === id);
    return categoriaFind;
  }

  async findByTitulo(titulo: string): Promise<Categoria | undefined> {
    const categoriaFind = this.categorias.find(u => u.titulo === titulo);

    return categoriaFind;
  }

  public async findAll(): Promise<Categoria[]> {
    const { categorias } = this;
    return categorias;
  }

  async create(categoriaData: ICreateCategoriaDTO): Promise<Categoria> {
    const categoria = new Categoria();
    Object.assign(categoria, { id: uuid() }, categoriaData);
    this.categorias.push(categoria);
    return categoria;
  }

  public async save(categoria: Categoria): Promise<Categoria> {
    const findIndex = this.categorias.findIndex(
      findCategoria => findCategoria.id === categoria.id,
    );
    this.categorias[findIndex] = categoria;
    return categoria;
  }
}
export default FakeCategoriasRepository;