import ICreateInformacaoDTO from '@modules/informacoes/dtos/ICreateInformacaoDTO';
import Informacao from '@modules/informacoes/infra/typeorm/entities/Informacao';

export default interface IInformacaoRepository {
  create(data: ICreateInformacaoDTO): Promise<Informacao>;
  save(informacao: Informacao): Promise<Informacao | undefined>;
  findById(id: string): Promise<Informacao | undefined>;
  findByTitulo(titulo: string): Promise<Informacao | undefined>;
  findAllLikeTitulo(titulo?: string): Promise<Informacao[]>;
  findAll(): Promise<Informacao[]>;
}
