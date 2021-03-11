import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePracasCentrais1615469660108
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pracas_centrais',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'praca_id',
            type: 'uuid',
            isNullable: false,
          },

          {
            name: 'centrais_id',
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
      'pracas_centrais',
      new TableForeignKey({
        name: 'pracasfk',
        columnNames: ['praca_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pracas',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'pracas_centrais',
      new TableForeignKey({
        name: 'centraisfk',
        columnNames: ['centrais_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'centrais',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pracas_centrais', 'pracasfk');
    await queryRunner.dropForeignKey('pracas_centrais', 'centraisfk');
    await queryRunner.dropTable('pracas_centrais');
  }
}
