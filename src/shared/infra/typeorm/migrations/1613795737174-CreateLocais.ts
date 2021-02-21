import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateLocais1613795737174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'locais',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cidades_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'orgaos_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'nome',
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
      'locais',
      new TableForeignKey({
        name: 'cidadesfk',
        columnNames: ['cidades_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cidades',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'locais',
      new TableForeignKey({
        name: 'orgaosfk',
        columnNames: ['orgaos_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orgaos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('locais', 'cidadesfk');
    await queryRunner.dropForeignKey('locais', 'orgaosfk');
    await queryRunner.dropTable('locais');
  }
}
