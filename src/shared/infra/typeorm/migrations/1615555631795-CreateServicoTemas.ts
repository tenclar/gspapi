import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateServicoTemas1615555631795
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'servicos_temas',
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
            name: 'tema_id',
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
      'servicos_temas',
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
      'servicos_temas',
      new TableForeignKey({
        name: 'temasfk',
        columnNames: ['tema_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'temas',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('servicos_temas', 'servicosfk');
    await queryRunner.dropForeignKey('servicos_temas', 'temasfk');
    await queryRunner.dropTable('servicos_temas');
  }
}
