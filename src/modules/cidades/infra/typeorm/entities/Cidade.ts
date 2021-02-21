import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cidades')
class Cidade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  slug: string;
}

export default Cidade;
