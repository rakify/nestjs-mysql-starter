import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesFinal1687149820351 implements MigrationInterface {
    name = 'EntitiesFinal1687149820351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdBy\` \`createdBy\` varchar(36) NOT NULL DEFAULT 'default_user'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedBy\` \`updatedBy\` varchar(36) NOT NULL DEFAULT 'default_user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedBy\` \`updatedBy\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdBy\` \`createdBy\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD PRIMARY KEY (\`id\`)`);
    }

}
