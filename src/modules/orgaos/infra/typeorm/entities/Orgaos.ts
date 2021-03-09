import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Superior from '@modules/superiores/infra/typeorm/entities/InstituicaoSuperior';

@Entity('orgaos')
class Orgaos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  slug: string;

  @Column()
  superiores_id: string;

  @ManyToOne(() => Superior)
  @JoinColumn({ name: 'superiores_id' })
  superior: Superior;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('boolean', { default: true })
  status: boolean;
}

export default Orgaos;
