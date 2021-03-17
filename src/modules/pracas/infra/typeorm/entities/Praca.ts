import Central from '@modules/centrais/infra/typeorm/entities/Central';

import ServicosPracas from '@modules/servicos/infra/typeorm/entities/ServicosPracas';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity('pracas')
class Praca {
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

  @OneToMany(() => ServicosPracas, servicospracas => servicospracas.praca)
  servicos: ServicosPracas[];

  @ManyToMany(() => Central, central => central.pracas)
  @JoinTable()
  centrais: Central[];
}

export default Praca;
