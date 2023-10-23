import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GLOBAL_VALIDATION_PIPE_CONFIG } from "./core/configuaration/validationPipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(GLOBAL_VALIDATION_PIPE_CONFIG));

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
