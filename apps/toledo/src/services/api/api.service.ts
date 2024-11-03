import { HttpClientMixin, type HttpClientOptions } from '@spuxx/js-utils';
import { sessionEndpoints } from './auth/session.endpoints';
import { globalErrorHandlers } from './global.error-handlers';
import { listsEndpoints } from './lists/lists.endpoints';

const endpoints = {
  ...sessionEndpoints,
  ...listsEndpoints,
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
