import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAviso1614367910411 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'avisos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'titulo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'conteudo',
            type: 'text',
            isNullable: true,
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
          {
            name: 'imagem',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'boolean',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('avisos');
  }
}
