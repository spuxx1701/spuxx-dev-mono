import { ApiProperty } from '@nestjs/swagger';
import { userPropertyDocs } from '../config/users.property-docs';
import { Map } from '@spuxx/nest-utils';

export class UserReadResource {
  @ApiProperty(userPropertyDocs.id)
  @Map()
  id: string;

  @ApiProperty(userPropertyDocs.username)
  @Map()
  username: string;

  @ApiProperty(userPropertyDocs.firstName)
  @Map()
  firstName: string;

  @ApiProperty(userPropertyDocs.familyName)
  @Map()
  familyName: string;

  @ApiProperty(userPropertyDocs.lastSeen)
  @Map()
  lastSeen: Date;
}
