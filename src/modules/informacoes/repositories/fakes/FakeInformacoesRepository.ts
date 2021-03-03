import { uuid } from 'uuidv4';
import IInformacoesRepository from '@modules/informacoes/repositories/IInformacoesRepository';
import ICreateInformacaoDTO from '@modules/informacoes/dtos/ICreateInformacaoDTO';

import Informacao from '@modules/informacoes/infra/typeorm/entities/Informacao';

class FakeInformacoesRepository implements IInformacoesRepository {
  private informacoes: Informacao[] = [];

  async findById(id: string): Promise<Informacao | undefined> {
    const informacaoFind = this.informacoes.find(u => u.id === id);
    return informacaoFind;
  }

  async findByTitulo(titulo: string): Promise<Informacao | undefined> {
    const informacaoFind = this.informacoes.find(u => u.titulo === titulo);

    return informacaoFind;
  }

  public async findAll(): Promise<Informacao[]> {
    const { informacoes } = this;
    return informacoes;
  }

  async create(informacaoData: ICreateInformacaoDTO): Promise<Informacao> {
    const informacao = new Informacao();
    Object.assign(informacao, { id: uuid() }, informacaoData);
    this.informacoes.push(informacao);
    return informacao;
  }

  public async save(informacao: Informacao): Promise<Informacao> {
    const findIndex = this.informacoes.findIndex(
      findAviso => findAviso.id === informacao.id,
    );
    this.informacoes[findIndex] = informacao;
    return informacao;
  }

  public async findAllLikeTitulo(titulo: string): Promise<Informacao[]> {
    const informacoes = this.informacoes.filter(
      u => u.titulo.toLowerCase().indexOf(titulo.toLocaleLowerCase()) > -1,
    );

    return informacoes;
  }
}
export default FakeInformacoesRepository;
