import { AccessManagerMixin } from '@src/auth/access-manager.mixin';
import { List } from '../models/list.model';

export class ListsAccessManager extends AccessManagerMixin(List) {}
