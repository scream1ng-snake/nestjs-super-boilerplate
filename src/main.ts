import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000)
  const config = new DocumentBuilder()
    .setTitle('POSTS')
    .setDescription('CRUD API by posts')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(port, () => {
    Logger.log(`Application started at http://localhost:${port}`, 'Main')
    Logger.log(`Swagger docs at http://localhost:${port}/api-doc`, 'Main')
  });
}
bootstrap();
