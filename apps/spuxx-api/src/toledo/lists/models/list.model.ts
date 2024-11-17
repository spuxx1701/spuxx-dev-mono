import { Map } from '@spuxx/nest-utils';
import { User } from '@src/users/models/user.model';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
  DefaultScope,
} from 'sequelize-typescript';
import { ListItem } from './list-item.model';
import { ListGuest } from './list-guest.model';
import { listProperties } from '../config/list.properties';

@DefaultScope(() => ({
  include: ['owner'],
}))
@Table({
  tableName: 'Toledo_Lists',
})
export class List extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  @Map()
  declare id: string;

  @Column
  @Map()
  declare name: string;

  @Column({ defaultValue: listProperties.icon.default })
  @Map()
  declare icon?: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare ownerId: string;

  @BelongsTo(() => User)
  @Map()
  declare owner: User;

  @BelongsToMany(() => User, () => ListGuest)
  @Map()
  declare guests?: User[];

  @Column
  @Map()
  declare usesCheckboxes: boolean;

  @Column
  @Map()
  declare requiresDeleteConfirmation: boolean;

  @Column
  @Map()
  declare usesQuantities: boolean;

  @HasMany(() => ListItem)
  @Map()
  declare items?: ListItem[];

  @Column
  declare inviteCode: string;

  @Map()
  declare createdAt: Date;

  @Map()
  declare updatedAt: Date;
}
