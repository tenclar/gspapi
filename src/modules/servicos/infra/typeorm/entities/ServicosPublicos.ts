import Publico from '@modules/publicos/infra/typeorm/entities/Publico';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Servico from './Servico';

@Entity('servicos_publicos')
class ServicosPublicos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  servico_id: string;

  @Column()
  publico_id: string;

  @ManyToOne(() => Servico, servico => servico.publicos)
  @JoinColumn({ name: 'servico_id' })
  servico: Servico;

  @ManyToOne(() => Publico, publico => publico.servicos)
  @JoinColumn({ name: 'publico_id' })
  publico: Publico;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ServicosPublicos;
