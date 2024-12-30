import { ApiParamOptions, ApiPropertyOptions } from '@nestjs/swagger';
import { UserReadResource } from '@src/users/dtos/user.read.resource';

export const recipeProperties = {
  id: {
    name: 'id',
    description: 'The id of the recipe.',
    example: crypto.randomUUID(),
  } as ApiParamOptions & ApiPropertyOptions,

  name: {
    description: 'The name of the recipe.',
    example: 'Spaghetti Bolognese',
  } as ApiPropertyOptions,

  icon: {
    description: 'The icon of the recipe. Supports icons from https://fonts.google.com/icons.',
    default: 'note-text',
  } as ApiPropertyOptions,

  text: {
    description: 'A text describing the recipe, for example including preparation steps.',
    example: '1. Put water on to boil. 2. Cook pasta.',
  } as ApiPropertyOptions,

  url: {
    description: 'A URL to the recipe, for example a link to a recipe website.',
    example: 'https://emmikochteinfach.de/bolognese-rezept/',
  } as ApiPropertyOptions,

  owner: {
    description: 'The user who owns the recipe.',
    type: UserReadResource,
  } as ApiPropertyOptions,

  guests: {
    description: 'The users that have guest access to the recipe.',
    type: UserReadResource,
    isArray: true,
  } as ApiPropertyOptions,

  createdAt: {
    description: 'The date and time the recipe was created.',
    example: new Date().toISOString(),
  } as ApiPropertyOptions,

  updatedAt: {
    description: 'The date and time the recipe was last updated.',
    example: new Date().toISOString(),
  } as ApiPropertyOptions,
};
