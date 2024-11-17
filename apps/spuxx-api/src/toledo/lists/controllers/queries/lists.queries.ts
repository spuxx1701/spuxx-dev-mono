import { IncludeQueryParam } from '@spuxx/nest-utils';

export class ListsFindByIdQuery {
  @IncludeQueryParam('guests', 'items')
  include?: string[];
}

export class ListsFindManyQuery {
  @IncludeQueryParam('guests', 'items')
  include?: string[];
}

export class ListsUpdateQuery {
  @IncludeQueryParam('guests', 'items')
  include?: string[];
}
