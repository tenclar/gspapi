import Central from '@modules/centrais/infra/typeorm/entities/Central';
import Servico from '@modules/servicos/infra/typeorm/entities/Servico';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => Servico, servico => servico.praca)
  servico: Servico[];

  @ManyToMany(() => Central, central => central.pracas)
  @JoinTable()
  centrais: Central[];
}

export default Praca;
