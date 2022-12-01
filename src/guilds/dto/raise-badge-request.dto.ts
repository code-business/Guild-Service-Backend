import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RaiseBadgeRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    default: '1a',
  })
  requesterId: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '1a2b',
  })
  requesterPublicKey: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'Creator',
  })
  badgeType: string;
}
