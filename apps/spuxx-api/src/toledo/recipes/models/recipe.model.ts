import { Map } from '@spuxx/nest-utils';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '@src/users/models/user.model';
import { recipeProperties } from '../config/recipe.properties';
import { RecipeGuest } from './recipe-guest.model';

@DefaultScope(() => ({
  include: ['owner', 'guests'],
}))
@Table({
  tableName: 'Toledo_Recipes',
})
export class Recipe extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  @Map()
  declare id: string;

  @Column({ allowNull: false })
  @Map()
  declare name: string;

  @Column({ defaultValue: recipeProperties.icon.default })
  @Map()
  declare icon: string;

  @Column({ allowNull: true })
  @Map()
  declare url?: string;

  @Column({ allowNull: true })
  @Map()
  declare text?: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare ownerId: string;

  @BelongsTo(() => User)
  @Map()
  declare owner: User;

  @BelongsToMany(() => User, () => RecipeGuest)
  @Map()
  declare guests?: User[];

  @Column
  declare inviteCode?: string;

  @Map()
  declare createdAt: Date;

  @Map()
  declare updatedAt: Date;

  declare deletedAt?: Date;
}
