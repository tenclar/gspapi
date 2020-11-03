import { Repository, getRepository, IsNull } from 'typeorm';
import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository';
import ICreateCategoriaDTO from '@modules/categorias/dtos/ICreateCategoriaDTO';
import Categoria from '../entities/Categoria';

class CategoriasRepository implements ICategoriasRepository {
  private ormRepository: Repository<Categoria>;

  constructor() {
    this.ormRepository = getRepository(Categoria);
  }

  async findById(id: string): Promise<Categoria | undefined> {
    const categoria = await this.ormRepository.findOne(id);
    return categoria;
  }

  async findByTitulo(titulo: string): Promise<Categoria | undefined> {
    const categoria = await this.ormRepository.findOne({
      where: { titulo },
    });
    return categoria;
  }

  async findAlls(): Promise<Categoria[]> {
    const listacategorias = await this.ormRepository.find({
      where: { categoria_id: null },
      relations: ['categorias'],
      order: { titulo: 'ASC' },
    });
    return listacategorias;
  }

  async findAll(): Promise<Categoria[]> {
    const categorias = await this.ormRepository
      .createQueryBuilder('categoria')
      // .where('categoria.categoria_id IS NULL')
      .innerJoinAndSelect('categoria.categorias', 'sub_categoria')
      .groupBy('categoria.id')
      .addGroupBy('categoria.categoria_id')
      .addGroupBy('sub_categoria.id')
      .getMany();

    /*
      const groupBy = (items, key) => items.reduce(
        (result, item) => ({
          ...result,
          [item[key]]: [
            ...(result[item[key]] || []),
            item,
          ],
        }),
        {},
      );
       */
    return categorias;
  }

  async create(categoriaData: ICreateCategoriaDTO): Promise<Categoria> {
    const categoria = this.ormRepository.create(categoriaData);
    await this.ormRepository.save(categoria);
    return categoria;
  }

  public async save(categoria: Categoria): Promise<Categoria> {
    return this.ormRepository.save(categoria);
  }
}

export default CategoriasRepository;
