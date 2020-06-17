import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { GOOGLE_FIREBASE_CREDENTIALS, GOOGLE_FIREBASE_DATABASE_URL } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  admin.initializeApp({
    credential: admin.credential.cert(GOOGLE_FIREBASE_CREDENTIALS),
    databaseURL: GOOGLE_FIREBASE_DATABASE_URL,
  });
  await app.listen(3000);
}
bootstrap();
