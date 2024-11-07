import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Mapper } from '@spuxx/nest-utils';
import { ListItem } from '../models/list-item.model';

@Injectable()
export class ListItemsProvider {
  constructor(
    @InjectModel(ListItem) private model: typeof ListItem,
    private readonly mapper: Mapper,
  ) {}
}
