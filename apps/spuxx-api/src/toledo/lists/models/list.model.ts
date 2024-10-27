import { Map } from '@spuxx/nest-utils';
import { User } from '@src/users/models/user.model';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';

@Table({
  tableName: 'Toledo_Lists',
})
export class List extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  @Map()
  declare id: string;

  @Column
  @Map()
  name: string;

  @Column
  @Map()
  icon?: string;

  @ForeignKey(() => User)
  @Column
  ownerId: string;

  @Map()
  declare createdAt: Date;

  @Map()
  declare updatedAt: Date;
}
