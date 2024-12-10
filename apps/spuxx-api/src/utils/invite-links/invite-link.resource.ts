import { ApiProperty } from '@nestjs/swagger';

export class InviteLinkResource {
  @ApiProperty({
    description:
      'The invite link. Any authenticated user opening this link will accept the invite.',
  })
  link: string;
  @ApiProperty({
    description: 'The invite code. Part of the invite link.',
  })
  code: string;
}
