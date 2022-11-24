import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBadgeTransactionDto {
  @IsNotEmpty()
  @ApiProperty({
    default: '637b18ca8ef642fd73b7fa58',
  })
  requestId: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '1a',
  })
  lenderId: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '1a2b',
  })
  lenderPublicKey: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '9vMrXCFxuPZazMF1cDhLCdvMo65niHrZwMEWuozX9eMV',
  })
  badgePublicKey: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '21 Nov, 2022',
  })
  allotmentDate: string;
}
