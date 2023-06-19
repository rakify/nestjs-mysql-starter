import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesFinal1687157317100 implements MigrationInterface {
    name = 'EntitiesFinal1687157317100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`accessRole\` enum ('customer', 'salesman', 'admin', 'super-admin') NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TABLE \`User\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`accessRole\``);
    }

}
