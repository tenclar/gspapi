import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('categorias')
class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  categoria_id: string;

  @Column()
  titulo: string;

  @Column()
  slug: string;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @OneToMany(() => Categoria, cat => cat.categoria)
  categorias: Categoria[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('boolean', { default: true })
  status: boolean;
}

export default Categoria;
