import { AuthModule } from '@app/auth';
import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers';

@Module({
  imports: [
    ControllersModule,
    AuthModule
  ]
})
export class ApiModule {}
