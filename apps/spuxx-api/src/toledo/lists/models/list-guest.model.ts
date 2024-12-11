import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { List } from './list.model';
import { User } from '@src/users/models/user.model';

@Table({ tableName: 'Toledo_ListGuests' })
export class ListGuest extends Model {
  @ForeignKey(() => List)
  @Column
  declare listId: string;

  @ForeignKey(() => User)
  @Column
  declare userId: string;
}
