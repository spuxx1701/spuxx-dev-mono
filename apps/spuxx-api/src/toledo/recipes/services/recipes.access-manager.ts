import { AccessManagerMixin } from '@src/auth/access-manager.mixin';
import { Recipe } from '../models/recipe.model';

export class RecipesAccessManager extends AccessManagerMixin(Recipe) {}
