import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlDataSource } from './core/config/database.config';
import { GraphQLConfig } from './core/config/graphql.config';
import { UserModule } from './modules/user/user.module';
import { AppResolver } from 'app.resolver';
import { AuthModule } from 'modules/auth/auth.module';
@Module({
  imports: [
    GraphQLModule.forRoot(GraphQLConfig),
    TypeOrmModule.forRoot(MysqlDataSource),
    UserModule,
    AuthModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
