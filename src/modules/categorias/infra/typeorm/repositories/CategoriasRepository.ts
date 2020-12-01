/* eslint-disable no-restricted-syntax */
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
      // relations: ['categorias'],
    });

    function getNestedChildren(arr, parent, cont) {
      const out = [];
      cont += 1;
      for (const i in arr) {
        if (arr[i].categoria_id === parent) {
          // arr[i].titulo = `${cont}---${arr[i].titulo}`;

          const subcategorias = getNestedChildren(arr, arr[i].id, cont);

          if (cont > 0) {
            const c = 0;
            while (c < cont) {
              arr[i].titulo = `---${arr[i].titulo}`;
              // arr[i].titulo = `-${arr[i].titulo}`;

              c += 1;
            }
          }

          out.push(arr[i]);
          if (subcategorias.length) {
            // arr[i].subcategorias = subcategorias;
            subcategorias.forEach(dd => {
              out.push(dd);
            });
          }
        }
      }
      return out;
    }

    const lista = getNestedChildren(listacategorias, null, -1);
    return lista;
    // return listacategorias;
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
