import { ApiProperty } from '@nestjs/swagger';
import { userProperties } from '../config/users.properties';
import { Map } from '@spuxx/nest-utils';

export class UserReadResource {
  @ApiProperty(userProperties.id)
  @Map()
  id: string;

  @ApiProperty(userProperties.username)
  @Map()
  username: string;

  @ApiProperty(userProperties.firstName)
  @Map()
  firstName: string;

  @ApiProperty(userProperties.familyName)
  @Map()
  familyName: string;

  @ApiProperty(userProperties.lastSeen)
  @Map()
  lastSeen: Date;
}
