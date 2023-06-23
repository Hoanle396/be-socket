import { Logger, ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dayjs from 'dayjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('App')
    .setDescription('The API description')
    .setVersion('1.0')
    .setContact('Lê Hữu Hoàn', 'https://hoanle.tk', 'hoanle396@gmail.com')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(4000).then(() => {
    Logger.verbose(
      `${dayjs().format('YYYY-MM-DD HH:mm:ssZ')}`,
      'APPLICATION STARTED'
    );
  });
}
bootstrap();
