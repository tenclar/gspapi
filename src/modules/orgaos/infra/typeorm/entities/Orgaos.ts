import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Superiores from '@modules/superiores/infra/typeorm/entities/InstituicaoSuperior';

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

  @ManyToOne(() => Superiores)
  @JoinColumn({ name: 'superiores_id' })
  superiores: Superiores;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('boolean', { default: true })
  status: boolean;
}

export default Orgaos;
