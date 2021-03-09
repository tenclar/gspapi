import ICreatePracaDTO from '@modules/pracas/dtos/ICreatePracaDTO';
import Praca from '@modules/pracas/infra/typeorm/entities/Praca';

export default interface IPracaRepository {
  create(data: ICreatePracaDTO): Promise<Praca>;
  save(praca: Praca): Promise<Praca | undefined>;
  findById(id: string): Promise<Praca | undefined>;
  findByNome(nome: string): Promise<Praca | undefined>;
  findAllLikeNome(nome: string): Promise<Praca[]>;
  findAll(): Promise<Praca[]>;
}
