import { Api } from '@/services/api';
import type { List, NewList } from '@/services/api/lists/lists.types';
import { isEmptyArray } from '@/utils/misc.utils';
import { Logger, ServiceMixin } from '@spuxx/js-utils';
import { ref } from 'vue';
import { ListItemsProvider } from './list-items.provider';

export class ListsProvider extends ServiceMixin<ListsProvider>() {
  private _lists = ref<List[]>([]);
  private _activeList = ref<List | null>(null);

  static get lists() {
    return this.instance._lists;
  }

  static get activeList() {
    return this.instance._activeList;
  }

  static setActiveList(list: List | null) {
    this.instance._activeList.value = list;
    ListItemsProvider.sort();
  }

  static async findMany(options?: { force?: boolean }): Promise<List[]> {
    const { force } = { force: false, ...options };
    if (force || isEmptyArray(this.lists.value)) {
      const lists = (this.lists.value = (await Api.findManyLists()) ?? []);
      this.sort();
      Logger.debug(`Retrieved ${lists.length} lists.`, ListsProvider.name);
      ListsProvider.lists.value = lists;
    }
    return this.lists.value;
  }

  static async findById(id: string): Promise<List> {
    const list = await Api.findListById(id);
    this.setActiveList(list);
    Logger.debug(`Retrieved list '${list.id}'.`, ListsProvider.name);
    return this.activeList.value!;
  }

  static async create(list: NewList): Promise<List> {
    const createdList = await Api.createList(list);
    this.lists.value.push(createdList);
    this.sort();
    Logger.debug(`Created new list '${createdList.id}'.`, ListsProvider.name);
    return createdList;
  }

  static async update(list: List): Promise<List> {
    const updatedList = await Api.updateList(list);
    this.setActiveList(list);
    const index = this.lists.value.findIndex((l) => l.id === updatedList.id);
    this.lists.value[index] = updatedList;
    this.sort();
    Logger.debug(`Updated list '${updatedList.id}'.`, ListsProvider.name);
    return updatedList;
  }

  static async delete(list: List): Promise<void> {
    const { id } = list;
    await Api.deleteList(id);
    const index = this.lists.value.findIndex((element) => element.id === id);
    this.lists.value.splice(index, 1);
    this.sort();
    Logger.debug(`Deleted list '${id}'.`, ListsProvider.name);
  }

  private static sort = () => {
    this.lists.value.sort((a: List, b: List) => a.name.localeCompare(b.name));
  };
}
