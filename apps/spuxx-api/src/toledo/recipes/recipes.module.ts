import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '@src/users/users.module';
import { Recipe } from './models/recipe.model';
import { RecipeGuest } from './models/recipe-guest.model';
import { RecipesCrudController } from './controllers/recipes.crud.controller';
import { RecipesProvider } from './services/recipes.provider';
import { RecipesAccessManager } from './services/recipes.access-manager';

@Module({
  imports: [SequelizeModule.forFeature([Recipe, RecipeGuest]), UsersModule],
  controllers: [RecipesCrudController],
  providers: [RecipesProvider, RecipesAccessManager],
})
export class RecipesModule {}
