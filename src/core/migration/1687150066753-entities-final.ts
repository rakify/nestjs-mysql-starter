import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesFinal1687150066753 implements MigrationInterface {
    name = 'EntitiesFinal1687150066753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`country\` varchar(10) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`country\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD PRIMARY KEY (\`id\`)`);
    }

}
