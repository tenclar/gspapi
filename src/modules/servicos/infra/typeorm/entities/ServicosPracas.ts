import Praca from '@modules/pracas/infra/typeorm/entities/Praca';
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

@Entity('servicos_pracas')
class ServicosPracas {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  servico_id?: string;

  @Column()
  praca_id: string;

  @ManyToOne(() => Servico, servico => servico.pracas)
  @JoinColumn({ name: 'servico_id' })
  servico?: Servico;

  @ManyToOne(() => Praca, praca => praca.servicos)
  @JoinColumn({ name: 'praca_id' })
  praca?: Praca;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default ServicosPracas;
