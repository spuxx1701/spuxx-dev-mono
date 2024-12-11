import { ListCreateResource } from '@src/toledo/lists/dtos/list.create.resource';

export const listCreateMockData = {
  groceries: {
    name: 'Groceries',
    icon: 'list-box',
    usesQuantities: true,
    usesCheckboxes: true,
  } as ListCreateResource,
  toDos: {
    name: 'To dos',
    icon: 'list',
    usesQuantities: false,
    usesCheckboxes: true,
  } as ListCreateResource,
  important: {
    name: 'Important',
    icon: 'star',
    usesQuantities: false,
    usesCheckboxes: false,
    requiresDeleteConfirmation: true,
  } as ListCreateResource,
};
