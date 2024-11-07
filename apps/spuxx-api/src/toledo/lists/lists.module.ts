import { Module } from '@nestjs/common';
import { ListsCrudController } from './controllers/lists.crud.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { List } from './models/list.model';
import { ListsProvider } from './services/lists.provider';
import { UsersModule } from '@spuxx-api/src/users/users.module';
import { ListItem } from './models/list-item.model';
import { ListItemsController } from './controllers/list-items.controller';
import { ListGuest } from './models/list-guest.model';
import { ListsAccessManager } from './services/lists.access-manager';
import { ListsActionsController } from './controllers/lists.actions.controller';
import { ListsInviteManager } from './services/lists.invite-manager';

@Module({
  imports: [SequelizeModule.forFeature([List, ListItem, ListGuest]), UsersModule],
  controllers: [ListsCrudController, ListsActionsController, ListItemsController],
  providers: [ListsProvider, ListsInviteManager, ListsAccessManager],
})
export class ListsModule {}
