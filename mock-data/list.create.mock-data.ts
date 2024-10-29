import { ListCreateResource } from 'apps/spuxx-api/src/toledo/lists/dtos/list.create.resource';

export const listCreateMockData = {
  groceries: {
    name: 'Groceries',
    icon: 'shopping_cart',
  } as ListCreateResource,
  toDos: {
    name: 'To dos',
    icon: 'list',
  } as ListCreateResource,
};