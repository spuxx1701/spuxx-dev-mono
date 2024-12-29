import { HttpClientMixin, type HttpClientOptions } from '@spuxx/js-utils';
import { sessionEndpoints } from './auth/session.endpoints';
import { globalErrorHandlers } from './global.error-handlers';
import { listsEndpoints } from './lists/lists.endpoints';
import { iconsEndpoints } from './icons/icons.endpoints';
import { usersEndpoints } from './users/users.endpoints';

const endpoints = {
  ...sessionEndpoints,
  ...usersEndpoints,
  ...listsEndpoints,
  ...iconsEndpoints,
};

const options: HttpClientOptions<typeof endpoints> = {
  endpoints,
  globalErrorHandlers,
};

export class Api extends HttpClientMixin(options) {
  static get requestOptions(): RequestInit {
    const options: RequestInit = {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    };
    return options;
  }
}
