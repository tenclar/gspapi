import Categoria from '@modules/categorias/infra/typeorm/entities/Categoria';
import Orgao from '@modules/orgaos/infra/typeorm/entities/Orgaos';
import ServicosEtapas from '@modules/servicos/infra/typeorm/entities/ServicosEtapas';
import ServicosLocais from '@modules/servicos/infra/typeorm/entities/ServicosLocais';
import ServicosPracas from '@modules/servicos/infra/typeorm/entities/ServicosPracas';
import ServicosPublicos from '@modules/servicos/infra/typeorm/entities/ServicosPublicos';
import ServicosTemas from '@modules/servicos/infra/typeorm/entities/ServicosTemas';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
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

  @Column('boolean', { default: true })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ServicosEtapas, etapas => etapas.servico, {
    cascade: true,
  })
  etapas: ServicosEtapas[];

  @OneToMany(() => ServicosLocais, locais => locais.servico)
  locais: ServicosLocais[];

  @OneToMany(() => ServicosPublicos, publicos => publicos.servico, {
    cascade: true,
  })
  publicos: ServicosPublicos[];

  @OneToMany(() => ServicosPracas, pracas => pracas.servico, {
    cascade: true,
  })
  pracas: ServicosPracas[];

  @OneToMany(() => ServicosTemas, temas => temas.servico, {
    cascade: true,
  })
  @JoinTable()
  temas: ServicosTemas[];
}

export default Servico;
