import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
// import * as cors from 'cors';
// const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalPipes(new ValidationPipe());
  // Logger.log('runnnn');
  // app.use(cors);
  // app.enableCors();
  await app.listen(3000);
}
bootstrap();
