import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { ProvidersModule } from 'libs/providers/src';
import { ApiModule } from './api';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainsModule } from './domains/domains.module';

@Module({
  imports: [
    SharedModule,
    ProvidersModule,
    ApiModule,
    DomainsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
