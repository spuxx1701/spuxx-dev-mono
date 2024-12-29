import { defineEndpoint } from '@spuxx/js-utils';
import type { User } from './users.types';
import { Config } from '@spuxx/browser-utils';
import { Api } from '../api.service';
import type { AppConfig } from '@/config/app.config';

export const usersEndpoints = {
  findManyUsers: defineEndpoint({
    function: async (): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/users`, Api.requestOptions);
    },
    transformer: async (response): Promise<User[]> => {
      const json = await response.json();
      const users = [...json];
      return users;
    },
  }),
};
