import { Module } from '@nestjs/common';
import { ListsModule } from './lists/lists.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [ListsModule, RecipesModule],
})
export class ToledoModule {}
