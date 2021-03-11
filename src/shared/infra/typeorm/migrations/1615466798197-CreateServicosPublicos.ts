import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateServicosPublicos1615466798197
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'servicos_publicos',
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
            name: 'publico_id',
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
      'servicos_publicos',
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
      'servicos_publicos',
      new TableForeignKey({
        name: 'publicosfk',
        columnNames: ['publico_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'publicos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('servicos_publicos', 'servicosfk');
    await queryRunner.dropForeignKey('servicos_publicos', 'publicosfk');
    await queryRunner.dropTable('servicos_publicos');
  }
}
