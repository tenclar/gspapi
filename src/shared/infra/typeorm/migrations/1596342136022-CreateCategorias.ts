import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCategorias1596342136022
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categorias',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'categoria_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'titulo',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'slug',
            type: 'varchar',
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
      'categorias',
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
    await queryRunner.dropForeignKey('categorias', 'categoriasfk');
    await queryRunner.dropTable('categorias');
  }
}
