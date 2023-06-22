# NestJs Template (Graphql+Typeorm version)

This is a starter template for project that needs nestJS backend. This version uses graphql and typeorm with mysql. This follows best practice that is mentioned at the [NestJS documentation](https://docs.nestjs.com/graphql/quick-start). This package handled authentication using `@nestjs/jwt` and seeding is handled by `nestjs-seeder`.

# Guidelines

## running project

first run this script:

`npm i`

then after verifying that your database is running and env file (please refer to _sample.env_) is ready you may build the project with:

`npm run build`

and run this project with this script:

`npm run start:dev`

## migration

to generate migration file make sure your project is built first using this script,

`npm run build`

then run this script:

`npm run migration-gen`

then build project with new migration file by running this script:

`npm run build`

now you can run migration file using this script:

`npm run migration-run`

## seed

before starting seeding procedure make sure your project is built, then register an account for yourself, get the hashed password, go to user schema and update

    @Factory(
    '$2b$10$/3sioxoWNCCo3g/efr.cXuuXNvUWcPJM/PoBmKNVcHTaXtvgASF7C', // You have to make change here
    )

this is going to be default password for all seed users.
finally run this script:

`npm run seed`

## drop schema

to drop all database and go back to the stage after migration-run, run this script:

`npm run schema-drop`
