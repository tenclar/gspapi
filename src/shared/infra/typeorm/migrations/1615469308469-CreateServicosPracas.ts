import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateServicosPracas1615470926114
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'servicos_pracas',
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
            name: 'praca_id',
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
      'servicos_pracas',
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
      'servicos_pracas',
      new TableForeignKey({
        name: 'pracasfk',
        columnNames: ['praca_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pracas',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('servicos_pracas', 'servicosfk');
    await queryRunner.dropForeignKey('servicos_pracas', 'pracasfk');
    await queryRunner.dropTable('servicos_pracas');
  }
}
