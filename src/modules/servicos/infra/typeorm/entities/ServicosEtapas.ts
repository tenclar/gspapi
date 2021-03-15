import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Servico from './Servico';

@Entity('servicos_etapas')
class ServicosEtatas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  servico_id: string;

  @Column('text')
  titulo: string;

  @Column()
  slug: string;

  @Column()
  informacao: string;

  @ManyToOne(() => Servico, servico => servico.etapas)
  servico: Servico;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ServicosEtatas;
