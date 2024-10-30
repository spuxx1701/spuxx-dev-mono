import { Module } from '@nestjs/common';
import { ListsController } from './controllers/lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { List } from './models/list.model';
import { ListsProvider } from './services/lists.provider';
import { UsersModule } from '@spuxx-api/src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([List]), UsersModule],
  controllers: [ListsController],
  providers: [ListsProvider],
})
export class ListsModule {}
