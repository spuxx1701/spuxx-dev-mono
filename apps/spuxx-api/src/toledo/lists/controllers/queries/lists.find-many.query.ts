import { IncludeQueryParam } from '@spuxx/nest-utils';

export class ListsFindManyQuery {
  @IncludeQueryParam('owner', 'items')
  include?: string[];
}
