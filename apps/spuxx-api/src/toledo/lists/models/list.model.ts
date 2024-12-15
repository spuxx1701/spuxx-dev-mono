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
  include: ['owner', 'guests'],
}))
@Table({
  tableName: 'Toledo_Lists',
})
export class List extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  @Map()
  declare id: string;

  @Column({ allowNull: false })
  @Map()
  declare name: string;

  @Column({ defaultValue: listProperties.icon.default })
  @Map()
  declare icon: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare ownerId: string;

  @BelongsTo(() => User)
  @Map()
  declare owner: User;

  @BelongsToMany(() => User, () => ListGuest)
  @Map()
  declare guests?: User[];

  @Column({ defaultValue: listProperties.usesCheckboxes.default })
  @Map()
  declare usesCheckboxes: boolean;

  @Column({ defaultValue: listProperties.requiresDeleteConfirmation.default })
  @Map()
  declare requiresDeleteConfirmation: boolean;

  @Column({ defaultValue: listProperties.usesQuantities.default })
  @Map()
  declare usesQuantities: boolean;

  @HasMany(() => ListItem)
  @Map()
  declare items?: ListItem[];

  @Column({ allowNull: true })
  declare inviteCode?: string;

  @Map()
  declare createdAt: Date;

  @Map()
  declare updatedAt: Date;
}
