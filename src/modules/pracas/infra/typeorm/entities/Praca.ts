import ServicosPracas from '@modules/servicos/infra/typeorm/entities/ServicosPracas';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import PracasCentrais from './PracaCentrais';

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

  @OneToMany(() => PracasCentrais, centrais => centrais.praca, {
    cascade: true,
    eager: true,
  })
  centrais: PracasCentrais[];

  @OneToMany(() => ServicosPracas, servicospracas => servicospracas.praca)
  servicos: ServicosPracas[];

  /*   @ManyToMany(() => Central, central => central.pracas)
  @JoinTable()
  centrais: Central[]; */
}

export default Praca;
