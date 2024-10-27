import { ApiParamOptions, ApiPropertyOptions } from '@nestjs/swagger';

export const listPropertyDocs = {
  id: {
    name: 'id',
    description: 'The id of the list.',
    example: crypto.randomUUID(),
  } as ApiParamOptions & ApiPropertyOptions,

  name: {
    description: 'The name of the list',
    example: 'Groceries',
  } as ApiPropertyOptions,

  icon: {
    description: 'The icon of the list. Supports icons from https://fonts.google.com/icons.',
    example: 'shopping_cart',
    required: false,
  } as ApiPropertyOptions,

  owner: {
    description: 'The user who owns the list.',
    example: crypto.randomUUID(),
  } as ApiPropertyOptions,

  createdAt: {
    description: 'The date and time the list was created.',
    example: new Date().toISOString(),
  } as ApiPropertyOptions,

  updatedAt: {
    description: 'The date and time the list was last updated.',
    example: new Date().toISOString(),
  } as ApiPropertyOptions,
};
