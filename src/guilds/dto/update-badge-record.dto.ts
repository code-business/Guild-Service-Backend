import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBadgeRecordDto {
  @IsNotEmpty()
  @ApiProperty({
    default: '9vMrXCFxuPZazMF1cDhLCdvMo65niHrZwMEWuozX9eMV',
  })
  publicKey: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '9vMrXCFxuPZazMF1cDhLCdvMo65niHrZwMEWuozX9eMV',
  })
  badgeType: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '9vMrXCFxuPZazMF1cDhLCdvMo65niHrZwMEWuozX9eMV',
  })
  mintAddress: string;
}
