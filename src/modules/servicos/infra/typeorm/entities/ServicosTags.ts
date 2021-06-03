import Tag from '@modules/tags/infra/typeorm/entities/Tag';
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

@Entity('servicos_tags')
class ServicosTags {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  servico_id?: string;

  @Column()
  tag_id: string;

  @ManyToOne(() => Servico, servico => servico.tags)
  @JoinColumn({ name: 'servico_id' })
  servico?: Servico;

  @ManyToOne(() => Tag, tag => tag.servicos)
  @JoinColumn({ name: 'tag_id' })
  tag?: Tag;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default ServicosTags;
