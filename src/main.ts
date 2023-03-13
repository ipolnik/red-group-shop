import { NestFactory } from '@nestjs/core';
import { Console } from 'console';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.setGlobalPrefix('api')
  app.enableCors();
  console.log("Server started");
  await app.listen(3100);
}
bootstrap();
