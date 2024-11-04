import { ValidationPipeOptions } from '@nestjs/common';

export const defaultValidationOptions: ValidationPipeOptions = {
  transform: true, // Properties should be transformed according to class-validator decorators
  transformOptions: {
    enableImplicitConversion: true, // When properties are transformed, implicit type conversions should be done automatically
  },
  whitelist: true, // Properties that haven't been declared via class-validator decorators will be stripped from the object
};
