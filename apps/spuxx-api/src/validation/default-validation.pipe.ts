import { ValidationPipe } from '@nestjs/common';
import { defaultValidationOptions } from './default-validation.config';

export const defaultValidationPipe = new ValidationPipe(defaultValidationOptions);
