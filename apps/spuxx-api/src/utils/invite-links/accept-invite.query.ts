import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AcceptInviteQuery {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'The invite code.',
  })
  code: string;
}
