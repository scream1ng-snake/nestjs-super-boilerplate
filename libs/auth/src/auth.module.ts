import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtFactory } from './config';
import { GUARDS } from './guards'
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync(JwtFactory)
  ],
  providers: [
    JwtStrategy,
    AuthService,
    ...GUARDS
  ],
  exports: [AuthService],
})
export class AuthModule {}
