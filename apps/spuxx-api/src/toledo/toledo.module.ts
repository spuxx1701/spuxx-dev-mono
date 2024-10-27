import { Module } from '@nestjs/common';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [ListsModule],
})
export class ToledoModule {}
