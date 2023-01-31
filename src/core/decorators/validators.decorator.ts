import { applyDecorators } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  ValidationOptions,
} from 'class-validator';

export function IsValidEmail() {
  return applyDecorators(
    IsEmail(),
    Transform((v) => v.value.toLowerCase()),
  );
}

export function IsValidInt(validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsInt(validationOptions),
    validationOptions?.each
      ? Transform(({ value }) => value.map((v) => +v))
      : Transform((v) => +v.value),
  );
}

export function IsValidDate() {
  return applyDecorators(
    IsDate(),
    Type(() => Date),
  );
}

export function IsValidBoolean() {
  return applyDecorators(
    IsBoolean(),
    Transform(({ value }) => [true, 'true'].includes(value)),
  );
}
