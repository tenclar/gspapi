import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import Servico from './Servico';

@Entity('servicos_etapas')
class ServicosEtapas {
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
  @JoinColumn({ name: 'servico_id' })
  servico: Servico;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ServicosEtapas;
