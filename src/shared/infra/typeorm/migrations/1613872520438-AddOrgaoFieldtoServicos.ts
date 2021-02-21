import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class AddOrgaoFieldtoServicos1613872520438
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'servicos',
      new TableColumn({
        name: 'orgao_id',
        type: 'uuid',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'servicos',
      new TableForeignKey({
        name: 'orgaosfk',
        columnNames: ['orgao_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orgaos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('servicos', 'orgaosfk');
    await queryRunner.dropColumn('servicos', 'orgao_id');
  }
}
