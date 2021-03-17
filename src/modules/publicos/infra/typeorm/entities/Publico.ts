import ServicosPublicos from '@modules/servicos/infra/typeorm/entities/ServicosPublicos';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('publicos')
class Publico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  slug: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('boolean', { default: true })
  status: boolean;

  @OneToMany(
    () => ServicosPublicos,
    servicospublicos => servicospublicos.publico,
  )
  servicos: ServicosPublicos[];
}

export default Publico;
