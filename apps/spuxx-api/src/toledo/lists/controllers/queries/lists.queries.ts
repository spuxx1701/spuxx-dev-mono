import { IncludeQueryParam } from '@spuxx/nest-utils';

export class ListsFindByIdQuery {
  @IncludeQueryParam('items')
  include?: string[];
}

export class ListsFindManyQuery {
  @IncludeQueryParam('items')
  include?: string[];
}

export class ListsUpdateQuery {
  @IncludeQueryParam('items')
  include?: string[];
}
