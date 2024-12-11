import { Module } from '@nestjs/common';
import { ListsCrudController } from './controllers/lists.crud.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { List } from './models/list.model';
import { ListsProvider } from './services/lists.provider';
import { UsersModule } from '@src/users/users.module';
import { ListItem } from './models/list-item.model';
import { ListItemsController } from './controllers/list-items.controller';
import { ListGuest } from './models/list-guest.model';
import { ListsAccessManager } from './services/lists.access-manager';
import { ListsActionsController } from './controllers/lists.actions.controller';
import { ListsInviteManager } from './services/lists.invite-manager';
import { ListItemsProvider } from './services/list-items.provider';

@Module({
  imports: [SequelizeModule.forFeature([List, ListItem, ListGuest]), UsersModule],
  controllers: [ListsCrudController, ListsActionsController, ListItemsController],
  providers: [ListsProvider, ListsInviteManager, ListsAccessManager, ListItemsProvider],
})
export class ListsModule {}
