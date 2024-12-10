import type { AppConfig } from '@/config/app.config';
import { Config } from '@spuxx/browser-utils';
import { defineEndpoint } from '@spuxx/js-utils';
import { Api } from '../api.service';
import type {
  List,
  ListInviteLink,
  ListItem,
  NewList,
  NewListItem,
  UpdatedList,
} from './lists.types';

export const listsEndpoints = {
  findManyLists: defineEndpoint({
    function: async (): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists`, Api.requestOptions);
    },
    transformer: async (response): Promise<List[] | undefined> => {
      const json = await response.json();
      const lists: List[] = [...json];
      return lists;
    },
  }),
  findListById: defineEndpoint({
    function: async (id: string): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists/${id}?include=items`, Api.requestOptions);
    },
    transformer: async (response): Promise<List> => {
      const json = await response.json();
      const list: List = { ...json };
      return list;
    },
  }),
  createList: defineEndpoint({
    function: async (list: NewList): Promise<Response> => {
      const body = JSON.stringify(list);
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists`, {
        ...Api.requestOptions,
        method: 'POST',
        body,
      });
    },
    transformer: async (response): Promise<List> => {
      const json = await response.json();
      const list: List = { ...json };
      return list;
    },
  }),
  updateList: defineEndpoint({
    function: async (list: UpdatedList): Promise<Response> => {
      const body = JSON.stringify(list);
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists/${list.id}?include=items`, {
        ...Api.requestOptions,
        method: 'PATCH',
        body,
      });
    },
    transformer: async (response): Promise<List> => {
      const json = await response.json();
      const list: List = { ...json };
      return list;
    },
  }),
  deleteList: defineEndpoint({
    function: async (id: string): Promise<void> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      await fetch(`${API_URL}/toledo/lists/${id}`, {
        ...Api.requestOptions,
        method: 'DELETE',
      });
    },
  }),
  generateListInvite: defineEndpoint({
    function: async (id: string): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists/${id}/generate-invite`, {
        ...Api.requestOptions,
        method: 'POST',
      });
    },
    transformer: async (response): Promise<ListInviteLink> => {
      const json = await response.json();
      const inviteLink: ListInviteLink = { ...json };
      return inviteLink;
    },
  }),
  acceptListInvite: defineEndpoint({
    function: async (id: string, code: string): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists/${id}/accept-invite?code=${code}`, {
        ...Api.requestOptions,
        method: 'PUT',
      });
    },
  }),
  createListItem: defineEndpoint({
    function: async (listId: string, item: NewListItem): Promise<Response> => {
      const body = JSON.stringify(item);
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists/${listId}/items`, {
        ...Api.requestOptions,
        method: 'POST',
        body,
      });
    },
    transformer: async (response): Promise<ListItem> => {
      const json = await response.json();
      const list: ListItem = { ...json };
      return list;
    },
  }),
  updateListItem: defineEndpoint({
    function: async (item: ListItem): Promise<Response> => {
      const body = JSON.stringify(item);
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists/${item.listId}/items/${item.id}`, {
        ...Api.requestOptions,
        method: 'PATCH',
        body,
      });
    },
    transformer: async (response): Promise<ListItem> => {
      const json = await response.json();
      const list: ListItem = { ...json };
      return list;
    },
  }),
  deleteListItem: defineEndpoint({
    function: async (listId: string, itemId: string): Promise<void> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      await fetch(`${API_URL}/toledo/lists/${listId}/items/${itemId}`, {
        ...Api.requestOptions,
        method: 'DELETE',
      });
    },
  }),
};
