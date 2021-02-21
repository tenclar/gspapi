import ICreateSuperiorDTO from '@modules/superiores/dtos/ICreateSuperioresDTO';
import Superior from '@modules/superiores/infra/typeorm/entities/InstituicaoSuperior';

export default interface ISuperiorRepository {
  create(data: ICreateSuperiorDTO): Promise<Superior>;
  save(superior: Superior): Promise<Superior | undefined>;
  findById(id: string): Promise<Superior | undefined>;
  findByNome(nome: string): Promise<Superior | undefined>;
  findAll(): Promise<Superior[]>;
}
