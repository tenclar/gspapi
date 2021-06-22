import Central from '@modules/centrais/infra/typeorm/entities/Central';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Praca from './Praca';

@Entity('pracas_centrais')
class PracaCentrais {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  centrais_id?: string;

  @Column()
  praca_id: string;

  @ManyToOne(() => Central, central => central.pracas)
  @JoinColumn({ name: 'centrais_id' })
  central?: Central;

  @ManyToOne(() => Praca, praca => praca.centrais)
  @JoinColumn({ name: 'praca_id' })
  praca?: Praca;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default PracaCentrais;
