import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';
import { ConfigKey } from '@config/config-key.enum';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const { port } = config.get<AppConfig>(ConfigKey.APP);
  app.useGlobalPipes(new ValidationPipe());

  const swagger = new DocumentBuilder()
    .setTitle('Nobel')
    .setDescription('The nobel API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log('App Running...');
  })
  .catch(console.error);
