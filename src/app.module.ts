import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlDataSource } from './config/database.config';
import { GraphQLConfig } from './config/graphql.config';
import { UserModule } from './user/user.module';
import { AppResolver } from 'app.resolver';
@Module({
  imports: [
    TypeOrmModule.forRoot(MysqlDataSource),
    GraphQLModule.forRoot(GraphQLConfig),
    UserModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
