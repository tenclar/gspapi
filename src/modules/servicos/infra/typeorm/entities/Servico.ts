import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';
import Orgao from '@modules/orgaos/infra/typeorm/entities/Orgaos';
import Praca from '@modules/pracas/infra/typeorm/entities/Praca';
import Publico from '@modules/publicos/infra/typeorm/entities/Publico';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
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

  @Column()
  publico: string;

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

  @ManyToMany(() => Publico, publico => publico.servicos)
  @JoinTable()
  publicos: Publico[];

  @ManyToMany(() => Praca, praca => praca.servico)
  @JoinTable()
  praca: Praca[];
}

export default Servico;
