import { IncludeQueryParam } from '@spuxx/nest-utils';

export class ListsFindByIdQuery {
  @IncludeQueryParam('guests', 'items')
  include?: string[];
}
