import { ListItemCreateResource } from '@src/toledo/lists/dtos/list-item.create.resource';
import { ListItemUpdateResource } from '@src/toledo/lists/dtos/list-item.update.resource';

export const listItemCreateMockData = {
  apples: {
    text: 'Apples',
    quantity: 4,
  } as Partial<ListItemCreateResource>,
  bananas: {
    text: 'Bananas',
    quantity: 2,
  } as Partial<ListItemCreateResource>,
  writeTests: {
    text: 'Write Tests',
  } as Partial<ListItemCreateResource>,
  gitGud: {
    text: 'Git gud!',
  } as Partial<ListItemCreateResource>,
};

export const listItemUpdateMockData = {
  check: {
    checked: true,
  } as ListItemUpdateResource,
  uncheck: {
    checked: false,
  } as ListItemUpdateResource,
  updateText: {
    text: 'Updated text',
  } as ListItemUpdateResource,
  updateQuantity: {
    quantity: 42,
  } as ListItemUpdateResource,
};
