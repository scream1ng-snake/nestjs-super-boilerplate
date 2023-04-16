import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCreateMigration1681653714321 implements MigrationInterface {
    name = 'PostCreateMigration1681653714321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL, "title" character varying NOT NULL, "message" character varying NOT NULL, "authorId" character varying NOT NULL, "isPublished" boolean NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
