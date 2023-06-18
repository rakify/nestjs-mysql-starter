import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesFinal1687083485632 implements MigrationInterface {
    name = 'EntitiesFinal1687083485632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`User\` (\`ID\` int NOT NULL AUTO_INCREMENT, \`CreatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`Name\` varchar(255) NOT NULL COMMENT 'Name of the user', \`Email\` varchar(255) NOT NULL COMMENT 'Provided email of the user', \`Password\` text NOT NULL COMMENT 'hashed password of the user', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`User\``);
    }

}
