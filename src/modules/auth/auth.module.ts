import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver'; // Import the AuthResolver
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserModule } from 'modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'modules/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
