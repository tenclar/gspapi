import ICreateCentralDTO from '@modules/centrais/dtos/ICreateCentralDTO';
import Central from '@modules/centrais/infra/typeorm/entities/Central';

export default interface ICentralRepository {
  create(data: ICreateCentralDTO): Promise<Central>;
  save(central: Central): Promise<Central | undefined>;
  findById(id: string): Promise<Central | undefined>;
  findByNome(nome: string): Promise<Central | undefined>;
  findAllLikeNome(nome: string): Promise<Central[]>;
  findAll(): Promise<Central[]>;
}
