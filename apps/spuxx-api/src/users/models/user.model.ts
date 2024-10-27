import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, type: DataType.UUID })
  declare id: string;

  @Column
  username: string;

  @Column
  firstName: string;

  @Column
  lastSeen: Date;

  declare createdAt: Date;

  declare updatedAt: Date;
}
