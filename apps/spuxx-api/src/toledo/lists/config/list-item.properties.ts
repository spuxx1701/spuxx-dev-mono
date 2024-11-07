import { ApiParamOptions, ApiPropertyOptions } from '@nestjs/swagger';
export const listItemProperties = {
  id: {
    name: 'id',
    description: 'The id of the list item.',
    example: crypto.randomUUID(),
  } as ApiParamOptions & ApiPropertyOptions,

  listId: {
    name: 'listId',
    description: 'The id of the list that the item belongs to.',
    example: crypto.randomUUID(),
  } as ApiParamOptions & ApiPropertyOptions,

  text: {
    description: 'The text content of the list item.',
    example: 'Apples',
  } as ApiPropertyOptions,

  quantity: {
    description: 'The quantity of the list item.',
    default: 1,
  } as ApiPropertyOptions,

  checked: {
    description: 'Whether the list item is currently checked.',
    default: false,
  } as ApiPropertyOptions,

  createdAt: {
    description: 'The date and time the list item was created.',
    example: new Date().toISOString(),
  } as ApiPropertyOptions,

  updatedAt: {
    description: 'The date and time the list item was last updated.',
    example: new Date().toISOString(),
  } as ApiPropertyOptions,
};
