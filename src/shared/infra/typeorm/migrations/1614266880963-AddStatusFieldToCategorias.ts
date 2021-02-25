import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddStatusFieldToCategorias1614266880963
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'categorias',
      new TableColumn({
        name: 'status',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('categorias', 'status');
  }
}
