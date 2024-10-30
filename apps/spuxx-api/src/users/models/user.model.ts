import { Map } from '@spuxx/nest-utils';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, type: DataType.UUID })
  @Map()
  declare id: string;

  @Column
  @Map()
  username: string;

  @Column
  @Map()
  firstName: string;

  @Column
  @Map()
  familyName: string;

  @Column
  @Map()
  lastSeen: Date;

  declare createdAt: Date;

  declare updatedAt: Date;
}
