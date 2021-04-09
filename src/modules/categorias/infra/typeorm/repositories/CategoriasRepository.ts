import { Repository, getRepository, Raw } from 'typeorm';
import ICategoriasRepository from '@modules/categorias/repositories/ICategoriasRepository';
import ICreateCategoriaDTO from '@modules/categorias/dtos/ICreateCategoriaDTO';

import Categoria from '../entities/Categoria';
/*
interface ICategorias {
  id: string;
  categoria_id: string | null;
  titulo: string;
  slug: string;
  created_at: string;
  updated_at: string;
  subcategory: [];
}
 */
class CategoriasRepository implements ICategoriasRepository {
  private ormRepository: Repository<Categoria>;

  constructor() {
    this.ormRepository = getRepository(Categoria);
  }

  async findById(id: string): Promise<Categoria | undefined> {
    const categoria = await this.ormRepository.findOne(id);
    return categoria;
  }

  async findByIdRelationCategoria(id: string): Promise<Categoria | undefined> {
    const categoria = await this.ormRepository.findOne(id, {
      relations: ['categoria'],
    });
    return categoria;
  }

  async findByTitulo(titulo: string): Promise<Categoria | undefined> {
    const categoria = await this.ormRepository.findOne({
      where: { titulo },
    });
    return categoria;
  }

  async findByTituloAndId(
    titulo: string,
    id: string,
  ): Promise<Categoria | undefined> {
    const categoria = await this.ormRepository.findOne({
      where: { titulo, id },
    });
    return categoria;
  }

  async findAllLikeTitulo(titulo: string): Promise<Categoria[]> {
    const listacategorias = await this.ormRepository.find({
      relations: ['categorias'],
      where: { titulo: Raw(alias => `${alias} ILIKE '%${titulo}%'`) },
    });
    return listacategorias;
  }

  async findAll(): Promise<Categoria[]> {
    const listacategorias = await this.ormRepository.find();
    return listacategorias;
  }

  async findAllRecursive(): Promise<Categoria[]> {
    const listacategorias = await this.ormRepository.find();

    function getNestedChildren(
      arr: Categoria[],
      parent: string | null,
      prof: number,
    ) {
      const out: Categoria[] = [];
      let cont = prof;
      cont += 1;

      arr.forEach(elem => {
        if (elem.categoria_id === parent) {
          const categoria = elem;
          if (cont > 0) {
            let c = 0;
            while (c < cont) {
              categoria.titulo = `---${categoria.titulo}`;

              c += 1;
            }
          }
          out.push(elem);
          const subcategorias = getNestedChildren(arr, elem.id, cont);

          if (subcategorias.length) {
            subcategorias.forEach(subc => {
              out.push(subc);
            });
          }
        }
      });

      return out;
    }

    const lista = getNestedChildren(listacategorias, null, -1);
    return lista;
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
