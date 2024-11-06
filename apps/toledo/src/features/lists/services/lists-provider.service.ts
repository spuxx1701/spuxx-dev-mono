import { Api } from '@/services/api';
import type { List, NewList } from '@/services/api/lists/lists.types';
import { isEmptyArray } from '@/utils/misc.utils';
import { Logger, ServiceMixin, sleep } from '@spuxx/js-utils';
import { ref } from 'vue';

export class ListsProvider extends ServiceMixin<ListsProvider>() {
  private _lists = ref<List[]>([]);

  static get lists() {
    return this.instance._lists;
  }

  static async findMany(options?: { force?: boolean }): Promise<List[]> {
    const { force } = { force: false, ...options };
    if (force || isEmptyArray(this.lists.value)) {
      const lists = (this.lists.value = (await Api.findManyLists()) ?? []);
      this.sortLists();
      Logger.debug(`Retrieved ${lists.length} lists.`, ListsProvider.name);
      ListsProvider.lists.value = lists;
    }
    return this.lists.value;
  }

  static async findById(id: string): Promise<List> {
    const list = await Api.findListById(id);
    await sleep(3000);
    Logger.debug(`Retrieved list '${list.id}'.`, ListsProvider.name);
    return list;
  }

  static async create(list: NewList): Promise<List> {
    const createdList = await Api.createList(list);
    this.lists.value.push(createdList);
    this.sortLists();
    Logger.debug(`Created new list '${createdList.id}'.`, ListsProvider.name);
    return createdList;
  }

  static async update(list: List): Promise<List> {
    const updatedList = await Api.updateList(list);
    const index = this.lists.value.findIndex((l) => l.id === updatedList.id);
    this.lists.value[index] = updatedList;
    this.sortLists();
    Logger.debug(`Updated list '${updatedList.id}'.`, ListsProvider.name);
    return updatedList;
  }

  private static sortLists = () => {
    this.lists.value.sort((a: List, b: List) => a.name.localeCompare(b.name));
  };
}
