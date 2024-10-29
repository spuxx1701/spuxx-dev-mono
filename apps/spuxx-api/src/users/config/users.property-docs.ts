import { ApiParamOptions, ApiPropertyOptions } from '@nestjs/swagger';

export const userPropertyDocs = {
  id: {
    name: 'id',
    description: 'The id of the user.',
    example: crypto.randomUUID(),
  } as ApiParamOptions & ApiPropertyOptions,

  username: {
    description: 'The username of the user.',
    example: 'john_doe',
  } as ApiPropertyOptions,

  firstName: {
    description: 'The first name of the user.',
    example: 'John',
  } as ApiPropertyOptions,

  lastName: {
    description: 'The last name of the user.',
    example: 'Doe',
  } as ApiPropertyOptions,

  lastSeen: {
    description: 'The last time the user was seen online.',
    example: new Date().toISOString(),
  } as ApiPropertyOptions,

  createdAt: {
    description: 'The date when the user was registered.',
    example: new Date().toISOString(),
  } as ApiPropertyOptions,

  updatedAt: {
    description: 'The date when the user was last updated.',
    example: new Date().toISOString(),
  } as ApiPropertyOptions,
};
