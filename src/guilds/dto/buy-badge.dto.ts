import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BuyBadgeDto {
  @IsNotEmpty()
  @ApiProperty({
    default: '3FNUmN76hK2qsd3hohjcyWLgMFr9HWSBFEgkhiB8Pe8C',
  })
  publicKey: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'Creator',
  })
  badgeType: string;
}
