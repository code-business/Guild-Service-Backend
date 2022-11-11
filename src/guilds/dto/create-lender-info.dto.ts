import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLenderInfoDto {
  @IsNotEmpty()
  @ApiProperty()
  pubkey: string;

  @IsNotEmpty()
  @ApiProperty()
  creatorBadgeCount: string;

  @IsNotEmpty()
  @ApiProperty()
  borrowerBadgeCount: string;

  @IsNotEmpty()
  @ApiProperty()
  createBadgeLent: string;

  @IsNotEmpty()
  @ApiProperty()
  borrowerBadgeLent: string;

  @IsNotEmpty()
  @ApiProperty()
  totalEarning: string;
}
