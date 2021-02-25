import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddStatusFieldToOrgaos1614267751356
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orgaos',
      new TableColumn({
        name: 'status',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orgaos', 'status');
  }
}
