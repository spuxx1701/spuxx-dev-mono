import { IncludeQueryParam } from '@spuxx/nest-utils';

export class ListsFindManyQuery {
  @IncludeQueryParam('guests', 'items')
  include?: string[];
}
