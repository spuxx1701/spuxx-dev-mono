import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '@src/users/models/user.model';
import { Recipe } from './recipe.model';

@Table({ tableName: 'Toledo_recipeGuests' })
export class RecipeGuest extends Model {
  @ForeignKey(() => Recipe)
  @Column
  declare recipeId: string;

  @ForeignKey(() => User)
  @Column
  declare userId: string;
}
