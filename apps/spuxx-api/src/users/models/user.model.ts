import { Map } from '@spuxx/nest-utils';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, type: DataType.UUID })
  @Map()
  declare id: string;

  @Column
  @Map()
  declare username: string;

  @Column
  @Map()
  declare firstName: string;

  @Column
  @Map()
  declare familyName: string;

  @Column
  @Map()
  declare lastSeen: Date;

  declare createdAt: Date;

  declare updatedAt: Date;
}
