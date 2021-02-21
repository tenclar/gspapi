import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instituicoes_superiores')
class InstituicaoSuperior {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  slug: string;
}

export default InstituicaoSuperior;
