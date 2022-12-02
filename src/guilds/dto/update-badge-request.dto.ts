import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBadgeRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    default: '637b18ca8ef642fd73b7fa58',
  })
  requestId: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'lender1',
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
  mintAddress: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '9vMrXCFxuPZazMF1cDhLCdvMo65niHrZwMEWuozX9eMV',
  })
  signature: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '9vMrXCFxuPZazMF1cDhLCdvMo65niHrZwMEWuozX9eMV',
  })
  status: string;
}
