import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { version } from '../package.json';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('Carbon Footprint')
    .setDescription(
      `Comparison of carbon footprints between different means of transport based on based on
      <a href="https://www.umweltbundesamt.de/bild/vergleich-der-durchschnittlichen-emissionen-0">https://www.umweltbundesamt.de/bild/vergleich-der-durchschnittlichen-emissionen-0</a> and
      <a href="https://api.goclimateneutral.org/docs">https://api.goclimateneutral.org/docs</a>`,
    )
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
