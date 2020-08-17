import ICreateCategoriaDTO from '@modules/categorias/dtos/ICreateCategoriaDTO';
import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';

export default interface ICategoriasReposotory {
  create(data: ICreateCategoriaDTO): Promise<Categoria>;
  save(categoria: Categoria): Promise<Categoria>;
  findById(id: string): Promise<Categoria | undefined>;
  findByTitulo(titulo: string): Promise<Categoria | undefined>;
  findAll(): Promise<Categoria[]>;
}