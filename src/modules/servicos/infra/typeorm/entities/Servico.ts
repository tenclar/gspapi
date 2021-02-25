import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';
import Orgao from '@modules/orgaos/infra/typeorm/entities/Orgaos';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('servicos')
class Servico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  slug: string;

  @Column('text')
  informacao: string;

  @Column()
  orgao_id: string;

  @Column()
  categoria_id: string;

  @ManyToOne(() => Orgao)
  @JoinColumn({ name: 'orgao_id' })
  orgao: Orgao;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('boolean', { default: true })
  status: boolean;
}

export default Servico;
