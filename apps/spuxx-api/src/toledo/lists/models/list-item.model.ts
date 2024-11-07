import { Map } from '@spuxx/nest-utils';
import { Model, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { List } from './list.model';
import { listItemProperties } from '../config/list-item.properties';

@Table({
  tableName: 'Toledo_ListItems',
})
export class ListItem extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  @Map()
  declare id: string;

  @ForeignKey(() => List)
  @Column({ type: DataType.UUID })
  @Map()
  declare listId: string;

  @Column
  @Map()
  declare text: string;

  @Column({ defaultValue: listItemProperties.checked.default })
  @Map()
  declare checked: boolean;

  @Column({ defaultValue: listItemProperties.quantity.default })
  @Map()
  declare quantity: number;

  @Map()
  declare createdAt: Date;

  @Map()
  declare updatedAt: Date;
}
