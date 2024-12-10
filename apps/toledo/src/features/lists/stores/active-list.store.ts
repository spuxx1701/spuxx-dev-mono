import { Api } from '@/services/api';
import type { List, ListItem, NewListItem, UpdatedList } from '@/services/api/lists/lists.types';
import { Logger } from '@spuxx/js-utils';
import { defineStore } from 'pinia';

interface State {
  activeList?: List;
}

const storeName = 'Store (active-list)';
export const useActiveListStore = defineStore(storeName, {
  state: (): State => {
    return { activeList: undefined };
  },
  getters: {
    list: (state) => state.activeList,
    items: (state) =>
      state.activeList?.items?.sort(
        (a, b) => Number(a.checked) - Number(b.checked) || a.text.localeCompare(b.text),
      ) ?? [],
  },
  actions: {
    /**
     * Fetches a list by its id and sets it as the active list.
     * @param id The list id.
     * @returns The list.
     */
    async fetch(id: string): Promise<List> {
      const list = await Api.findListById(id);
      Logger.debug(`Retrieved list '${list.id}'.`, storeName);
      this.$state = { activeList: list };
      return list;
    },
    /**
     * Clears the currently active list.
     */
    clear() {
      this.activeList = undefined;
      Logger.debug(`Active ist has been cleared.`, storeName);
    },
    /**
     * Patches the currently active list with the given set of new values.
     * @param list The updated list.
     * @returns The list after the update.
     */
    async update(list: UpdatedList): Promise<List> {
      if (!this.activeList) {
        throw new Error('Must have an active list when attempting an update.');
      }
      const allowedKeys: Array<keyof UpdatedList> = [
        'name',
        'icon',
        'requiresDeleteConfirmation',
        'usesCheckboxes',
        'usesQuantities',
      ];
      const patch: UpdatedList = {
        id: list.id,
      };
      for (const key of allowedKeys) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (patch as any)[key] = list[key];
      }
      const result = await Api.updateList(patch);
      this.$state = { activeList: result };
      Logger.debug(`Updated list '${result.id}'.`, storeName);
      return result;
    },
    /**
     * Adds a new list item to the currently active list.
     * @param item The new item to add.
     * @returns The list item after it has been created.
     */
    async addItem(item: NewListItem): Promise<ListItem> {
      if (!this.activeList) {
        throw new Error('Must have an active list when attempting add a new item.');
      }
      const result = await Api.createListItem(this.activeList.id, item);
      this.items.push(result);
      Logger.debug(`Created new list item '${result.id}'.`, storeName);
      return result;
    },
    /**
     * Updates the given list item.
     * @param item The updated list item.
     * @returns The list item after the update.
     */
    async updateItem(item: ListItem): Promise<ListItem> {
      const result = await Api.updateListItem(item);
      Logger.debug(`Updated list item '${result.id}'.`, storeName);
      return result;
    },
    /**
     * Deletes the given list item.
     * @param listItem The list item to delete.
     */
    async deleteItem(item: ListItem): Promise<void> {
      const { id, listId } = item;
      await Api.deleteListItem(listId, id);
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);
      Logger.debug(`Deleted list item '${id}'.`, storeName);
    },
  },
});
