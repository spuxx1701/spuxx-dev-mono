import { IncludeQueryParam } from '@spuxx/nest-utils';

export class ListsFindByIdQuery {
  @IncludeQueryParam('owner', 'items')
  include?: string[];
}
