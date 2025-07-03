import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Multer } from 'multer';
import { Get } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger конфиг
  const config = new DocumentBuilder()
    .setTitle('Users & Telegram API')
    .setDescription('API для работы с пользователями и Telegram-ботом')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Запуск приложения
  await app.listen(3000);
  console.log(`Сервер запущен: http://localhost:3000`);
  console.log(`Swagger: http://localhost:3000/api`);
}
bootstrap();