import type { AppConfig } from '@/config/app.config';
import { Config } from '@spuxx/browser-utils';
import { defineEndpoint } from '@spuxx/js-utils';
import { Api } from '../api.service';
import type { List, NewList } from './lists.types';

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
};
