import Cidade from '@modules/cidades/infra/typeorm/entities/Cidade';
import Orgaos from '@modules/orgaos/infra/typeorm/entities/Orgaos';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('locais')
class Local {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  slug: string;

  @Column()
  orgao_id: string;

  @Column()
  cidade_id: string;

  @ManyToOne(() => Orgaos)
  @JoinColumn({ name: 'orgao_id' })
  orgao: Orgaos;

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: 'cidade_id' })
  cidade: Cidade;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('boolean', { default: true })
  status: boolean;
}

export default Local;
