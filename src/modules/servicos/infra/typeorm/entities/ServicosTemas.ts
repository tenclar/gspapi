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

@Entity('servicos_temas')
class ServicosTemas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  servico_id: string;

  @ManyToOne(() => Servico, servico => servico.temas)
  @JoinColumn({ name: 'servico_id' })
  servico: Servico;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ServicosTemas;
