import { ApiParamOptions, ApiPropertyOptions } from '@nestjs/swagger';

export const listProperties = {
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
    default: 'shopping_cart',
    required: false,
  } as ApiPropertyOptions,

  usesCheckboxes: {
    description:
      'When enabled, instructs clients to show interactive checkboxes that control \
    the checked state of items in the list.',
    default: true,
  } as ApiPropertyOptions,

  requiresDeleteConfirmation: {
    description:
      'When enabled, instructs clients to ask the user for confirmation before deleting items \
      from the list.',
    default: false,
  } as ApiPropertyOptions,

  usesQuantities: {
    description: 'When enabled, instructs clients to display the quantity input for items in the list.',
    default: false,
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
