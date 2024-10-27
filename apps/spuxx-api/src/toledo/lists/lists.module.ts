import { Module } from '@nestjs/common';
import { ListsController } from './controllers/lists.controller';
import { AuthModule } from '@spuxx/nest-utils';
import { authConfig } from '@src/auth/auth.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { List } from './models/list.model';
import { ListsProvider } from './services/lists.provider';

@Module({
  imports: [AuthModule.forRoot(authConfig), SequelizeModule.forFeature([List])],
  controllers: [ListsController],
  providers: [ListsProvider],
})
export class ListsModule {}
