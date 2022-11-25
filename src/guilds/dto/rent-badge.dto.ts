import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RentBadgeDto {
  @IsNotEmpty()
  @ApiProperty({
    default: '3FNUmN76hK2qsd3hohjcyWLgMFr9HWSBFEgkhiB8Pe8C',
  })
  lenderPublicKey: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '7jaJFog3htTyPqhvDf4ZUKGo2FVFr7bKgFJwLFZTNi68',
  })
  borrowerPublicKey: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'mint',
  })
  mint: string;

  status: string;
}
