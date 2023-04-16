import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { ProvidersModule } from 'libs/providers/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SharedModule,
    ProvidersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
