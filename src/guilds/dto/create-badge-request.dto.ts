import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBadgeRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  requesterDetails: string;

  @IsNotEmpty()
  @ApiProperty()
  requesterPublicKey: string;

  @IsNotEmpty()
  @ApiProperty()
  lenderPublicKey: string;

  @IsNotEmpty()
  @ApiProperty()
  badgePublicKey: string;

  @IsNotEmpty()
  @ApiProperty()
  badgeType: string;

  @IsNotEmpty()
  @ApiProperty()
  allotmentDate: string;

  @IsNotEmpty()
  @ApiProperty()
  revokeDate: string;

  @IsNotEmpty()
  @ApiProperty()
  revokeReason: string;

  @IsNotEmpty()
  @ApiProperty()
  lenderborrowerType: string;

  @IsNotEmpty()
  @ApiProperty()
  status: string;

  @IsNotEmpty()
  @ApiProperty()
  requestedOn: string;
}
