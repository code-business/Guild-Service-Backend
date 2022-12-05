import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(['/api'], (req: any, res: any, next: any) => {
    const { key } = req.query;
    if (
      (key && key === process.env.SWAGGER_KEY) ||
      [
        '/swagger-ui.css',
        '/swagger-ui-bundle.js',
        '/swagger-ui-standalone-preset.js',
        '/swagger-ui-init.js',
      ].includes(req.url)
    ) {
      next();
    } else {
      res.status(401).json({ code: 401, message: 'Un-authorized access' });
    }
  });

  const config = new DocumentBuilder()
    .setTitle('Guilds example')
    .setDescription('The guilds API description')
    .setVersion('1.0')
    .addTag('guilds')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(process.env.PORT);
  console.log('server is listening on port', process.env.PORT);
}
bootstrap();
