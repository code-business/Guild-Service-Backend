import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBadgeRequestDto {
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
    default: 'Akshay Pisal',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '12 Aug, 2022',
  })
  joinDate: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'Creator 2X',
  })
  badgeType: string;
}
