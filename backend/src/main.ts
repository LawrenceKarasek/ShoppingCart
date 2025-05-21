
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ProductSeederService } from './modules/seeders/product-seeder-service';
import { startDatabase } from './modules/database/db';
import { AppModule } from './modules/app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit();
  });

  await startDatabase();
  const app = await NestFactory.create(AppModule);

  const productSeeder = app.get(ProductSeederService);
  await productSeeder.seedProducts();

  app.use(cookieParser()); // Enable cookie-parser middleware

  app.enableCors({
    origin: 'http://localhost:4200', // Adjust if frontend runs on a different port
    credentials: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = 3000;
  // const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

