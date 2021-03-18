import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddConteudoFieldToLocais1616075272736
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'locais',
      new TableColumn({
        name: 'conteudo',
        type: 'text',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('locais', 'conteudo');
  }
}
