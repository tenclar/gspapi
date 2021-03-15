import ServicosPublicos from '@modules/servicos/infra/typeorm/entities/ServicosPublicos';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
    servicospublicos => servicospublicos.servico,
  )
  @JoinColumn({ name: 'publico_id' })
  servicos: ServicosPublicos[];
}

export default Publico;
