import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBadgeHistoryDto {
  @IsNotEmpty()
  @ApiProperty({
    default: '1a',
  })
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '9vMrXCFxuPZazMF1cDhLCdvMo65niHrZwMEWuozX9eMV',
  })
  mint: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '9vMrXCFxuPZazMF1cDhLCdvMo65niHrZwMEWuozX9eMV',
  })
  signature: string;

  status: string;
}
