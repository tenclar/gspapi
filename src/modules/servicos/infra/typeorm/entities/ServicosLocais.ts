import Local from '@modules/local/infra/typeorm/entities/Local';
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

@Entity('servicos_locais')
class ServicosLocais {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  servico_id?: string;

  @Column()
  locais_id: string;

  @ManyToOne(() => Servico, servico => servico.locais)
  @JoinColumn({ name: 'servico_id' })
  servico?: Servico;

  @ManyToOne(() => Local, local => local.servicos)
  @JoinColumn({ name: 'locais_id' })
  local?: Local;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default ServicosLocais;
