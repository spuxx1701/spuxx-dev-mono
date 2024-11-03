import { Api } from '@/services/api';
import type { List, NewList } from '@/services/api/lists/lists.types';
import { isEmptyArray } from '@/utils/misc.utils';
import { Logger, ServiceMixin } from '@spuxx/js-utils';
import { ref, type Ref } from 'vue';

export class ListsProvider extends ServiceMixin<ListsProvider>() {
  private _lists = ref<List[]>([]);

  static get lists() {
    return this.instance._lists;
  }

  static async findMany(options?: { force?: boolean }): Promise<Ref<List[]>> {
    const { force } = { force: false, ...options };
    if (force || isEmptyArray(this.lists.value)) {
      const lists = (this.lists.value = (await Api.findManyLists()) ?? []);
      this.sortLists();
      Logger.debug(`Retrieved ${lists.length} lists.`, ListsProvider.name);
      ListsProvider.lists.value = lists;
    }
    return this.lists;
  }

  static async create(list: NewList): Promise<List> {
    const createdList = await Api.createList(list);
    this.lists.value.push(createdList);
    this.sortLists();
    Logger.debug(`Created new list '${createdList.id}'.`, ListsProvider.name);
    return createdList;
  }

  private static sortLists = () => {
    this.lists.value.sort((a: List, b: List) => a.name.localeCompare(b.name));
  };
}
