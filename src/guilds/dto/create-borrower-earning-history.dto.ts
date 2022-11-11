import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBorrowerEarningHistoryDto {
  @IsNotEmpty()
  @ApiProperty()
  borrowerId: string;

  @IsNotEmpty()
  @ApiProperty()
  lenderId: string;

  @IsNotEmpty()
  @ApiProperty()
  lenderSplit: string;

  @IsNotEmpty()
  @ApiProperty()
  date: string;

  @IsNotEmpty()
  @ApiProperty()
  creatorSideEarning: string;

  @IsNotEmpty()
  @ApiProperty()
  borrowerSideEarning: string;
}
