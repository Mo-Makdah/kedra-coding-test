import { ValidationPipeOptions } from "@nestjs/common";

export const GLOBAL_VALIDATION_PIPE_CONFIG = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
} as const satisfies ValidationPipeOptions;
