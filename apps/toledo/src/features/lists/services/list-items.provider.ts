import type { ListItem, NewListItem } from '@/services/api/lists/lists.types';
import { Logger, ServiceMixin } from '@spuxx/js-utils';
import { ListsProvider } from './lists.provider';
import { Api } from '@/services/api';

export class ListItemsProvider extends ServiceMixin<ListItemsProvider>() {
  static get items() {
    return ListsProvider.activeList.value?.items ?? [];
  }

  static async create(listId: string, newListItem: NewListItem): Promise<ListItem> {
    const result = await Api.createListItem(listId, newListItem);
    if (ListsProvider.activeList.value) {
      ListsProvider.activeList.value.items!.push(result);
      this.sort();
    }
    Logger.debug(`Created new list item '${result.id}'.`, ListItemsProvider.name);
    return result;
  }

  static async update(listItem: ListItem): Promise<ListItem> {
    const result = await Api.updateListItem(listItem);
    if (ListsProvider.activeList.value) {
      listItem = result;
      this.sort();
    }
    Logger.debug(`Updated list item '${result.id}'.`, ListItemsProvider.name);
    return result;
  }

  static async delete(item: ListItem): Promise<void> {
    const { id, listId } = item;
    await Api.deleteListItem(listId, id);
    if (ListsProvider.activeList.value) {
      const index = this.items.findIndex((element) => element.id === id);
      this.items.splice(index, 1);
      this.sort();
    }
    Logger.debug(`Deleted list item '${id}'.`, ListItemsProvider.name);
  }

  static sort = (): ListItem[] => {
    return this.items.sort(
      (a, b) => Number(a.checked) - Number(b.checked) || a.text.localeCompare(b.text),
    );
  };
}
