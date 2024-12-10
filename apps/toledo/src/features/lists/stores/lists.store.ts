import { Api } from '@/services/api';
import type { List, NewList } from '@/services/api/lists/lists.types';
import { SessionManager } from '@/services/session';
import { Logger } from '@spuxx/js-utils';
import { defineStore } from 'pinia';
import { useActiveListStore } from './active-list.store';

interface State {
  lists: List[];
}

const storeName = 'Store (lists)';
export const useListsStore = defineStore(storeName, {
  state: (): State => {
    return { lists: [] };
  },
  getters: {
    all(state): List[] {
      return state.lists.sort((a, b) => a.name.localeCompare(b.name));
    },
    owned(): List[] {
      return this.all.filter((list) => list.owner.id === SessionManager.session?.value?.sub);
    },
    shared(): List[] {
      return this.all.filter((list) => list.owner.id !== SessionManager.session?.value?.sub);
    },
  },
  actions: {
    /**
     * Fetches all lists the user has access to.
     * @param options More options.
     * @returns The lists.
     */
    async fetch(options?: StoreFetchOptions): Promise<List[]> {
      if (this.lists.length > 0 && !options?.reload) return this.lists;
      const lists = (await Api.findManyLists()) ?? [];
      this.$state = { lists };
      Logger.debug(`Retrieved ${lists.length} lists.`, storeName);
      return this.all;
    },
    /**
     * Creates a new list.
     * @returns The newly created list.
     */
    async create(list: NewList): Promise<List> {
      const createdList = await Api.createList(list);
      Logger.debug(`Created new list '${createdList.id}'.`, storeName);
      this.lists = [...this.$state.lists, createdList];
      return createdList;
    },
    /**
     * Deletes a list.
     * @param id The list id.
     */
    async delete(id: string): Promise<void> {
      const list = this.lists.find((element) => element.id === id);
      if (!list) return;
      await Api.deleteList(id);
      const index = this.lists.indexOf(list);
      this.lists.splice(index, 1);
      Logger.debug(`Deleted list '${id}'.`, storeName);
      const activeListStore = useActiveListStore();
      if (activeListStore.list?.id === list.id) activeListStore.clear();
    },
  },
});
