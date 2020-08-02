import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateServicosCategorias1596343962892
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'servicos_categorias',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'servico_id',
            type: 'uuid',
            isNullable: false,
          },

          {
            name: 'categoria_id',
            type: 'uuid',
            isNullable: false,
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'servicos_categorias',
      new TableForeignKey({
        name: 'servicosfk',
        columnNames: ['servico_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'servicos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'servicos_categorias',
      new TableForeignKey({
        name: 'categoriasfk',
        columnNames: ['categoria_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categorias',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('servicos', 'servicosfk');
    await queryRunner.dropForeignKey('categorias', 'categoriasfk');
    await queryRunner.dropTable('servicos_categorias');
  }
}
