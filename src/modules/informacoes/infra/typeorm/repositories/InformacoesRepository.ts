import { Repository, getRepository, Raw } from 'typeorm';
import IInformacaoRepository from '@modules/informacoes/repositories/IInformacoesRepository';
import ICreateInformacaoDTO from '@modules/informacoes/dtos/ICreateInformacaoDTO';

import Informacao from '@modules/informacoes/infra/typeorm/entities/Informacao';

class InformacoesRepository implements IInformacaoRepository {
  private ormRepository: Repository<Informacao>;

  constructor() {
    this.ormRepository = getRepository(Informacao);
  }

  async findById(id: string): Promise<Informacao | undefined> {
    const informacao = await this.ormRepository.findOne({
      where: { id },
    });
    return informacao;
  }

  async findByTitulo(titulo: string): Promise<Informacao | undefined> {
    const informacao = await this.ormRepository.findOne({
      where: { titulo },
    });
    return informacao;
  }

  async findAllLikeTitulo(titulo: string): Promise<Informacao[]> {
    const listaTitulo = await this.ormRepository.find({
      where: { titulo: Raw(alias => `${alias} ILIKE '%${titulo}%'`) },
    });
    return listaTitulo;
  }

  async findAll(): Promise<Informacao[]> {
    const informacao = await this.ormRepository.find();
    return informacao;
  }

  async create(informacaoData: ICreateInformacaoDTO): Promise<Informacao> {
    const informacao = this.ormRepository.create(informacaoData);
    await this.ormRepository.save(informacao);
    return informacao;
  }

  public async save(informacao: Informacao): Promise<Informacao> {
    return this.ormRepository.save(informacao);
  }
}

export default InformacoesRepository;
