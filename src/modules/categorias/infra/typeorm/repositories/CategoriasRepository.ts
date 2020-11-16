import { Repository, getRepository } from 'typeorm';
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

  async findAllss(): Promise<Categoria[]> {
    const listacategorias = await this.ormRepository.find();
    return listacategorias;
  }

  async findAll(): Promise<Categoria[]> {
    const listacategorias = await this.ormRepository.find({
      relations: ['categorias'],
    });
    return listacategorias;
  }

  async findAlls(): Promise<Categoria[]> {
    const categorias = await this.ormRepository
      .createQueryBuilder('categoria')
      // .where('categoria.categoria_id IS NULL')
      .leftJoinAndSelect('categoria.categorias', 'sub_categoria')
      .addGroupBy('categoria.categoria_id')
      .groupBy('categoria.id')
      .addGroupBy('sub_categoria.categoria_id')
      .addGroupBy('sub_categoria.id')

      .orderBy('categoria.categoria_id', 'DESC')

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
