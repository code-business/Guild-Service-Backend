import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBorrowerEarningStatDto {
  @IsNotEmpty()
  @ApiProperty()
  borrowerId: string;

  @IsNotEmpty()
  @ApiProperty()
  borrowerDaily: string;

  @IsNotEmpty()
  @ApiProperty()
  borrowerWeekly: string;

  @IsNotEmpty()
  @ApiProperty()
  borrowerMonthly: string;

  @IsNotEmpty()
  @ApiProperty()
  creatorDaily: string;

  @IsNotEmpty()
  @ApiProperty()
  creatorWeekly: string;

  @IsNotEmpty()
  @ApiProperty()
  creatorMonthly: string;
}
