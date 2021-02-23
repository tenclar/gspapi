import ICreateCategoriaDTO from '@modules/categorias/dtos/ICreateCategoriaDTO';
import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';

export default interface ICategoriasRepository {
  create(data: ICreateCategoriaDTO): Promise<Categoria>;
  save(categoria: Categoria): Promise<Categoria>;
  findById(id: string): Promise<Categoria | undefined>;
  findByTitulo(titulo: string): Promise<Categoria | undefined>;
  findByTituloAndId(titulo: string, id: string): Promise<Categoria | undefined>;
  findAllLikeTitulo(titulo: string): Promise<Categoria[]>;
  findAll(): Promise<Categoria[]>;
}
