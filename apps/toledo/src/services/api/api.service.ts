import { HttpClientMixin, type HttpClientOptions } from '@spuxx/js-utils';
import { sessionEndpoints } from './auth/session.endpoints';

const endpoints = {
  ...sessionEndpoints,
};

const options: HttpClientOptions<typeof endpoints> = {
  endpoints,
};

export class Api extends HttpClientMixin(options) {
  static get requestOptions(): RequestInit {
    const options: RequestInit = {
      credentials: 'include',
    };
    return options;
  }
}
