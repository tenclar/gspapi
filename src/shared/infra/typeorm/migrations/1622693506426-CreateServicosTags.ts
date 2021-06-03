import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateServicosTags1622693506426
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'servicos_tags',
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
            name: 'tag_id',
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
          {
            name: 'status',
            type: 'boolean',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'servicos_tags',
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
      'servicos_tags',
      new TableForeignKey({
        name: 'tagsfk',
        columnNames: ['tag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('servicos_tags', 'servicosfk');
    await queryRunner.dropForeignKey('servicos_tags', 'tagsfk');
    await queryRunner.dropTable('servicos_tags');
  }
}
