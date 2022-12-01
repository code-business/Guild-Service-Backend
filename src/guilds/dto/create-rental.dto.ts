import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRentalDto {
  @IsNotEmpty()
  @ApiProperty({
    default: 'string (Badge NFT Id)',
  })
  badgeId: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'string (Lender public address/key)',
  })
  lenderAddress: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'string (Borrower public address/key)',
  })
  borrowerAdress: string;
}
