import ICreateOrgaoDTO from '@modules/orgaos/dtos/ICreateOrgaosDTO';
import Orgao from '@modules/orgaos/infra/typeorm/entities/Orgaos';

export default interface IOrgaoRepository {
  create(data: ICreateOrgaoDTO): Promise<Orgao>;
  save(orgao: Orgao): Promise<Orgao | undefined>;
  findById(id: string): Promise<Orgao | undefined>;
  findByNome(nome: string): Promise<Orgao | undefined>;
  findAllLikeNome(nome: string): Promise<Orgao[]>;
  findAll(): Promise<Orgao[]>;
}
