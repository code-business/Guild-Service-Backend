import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBadgeRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    default: 'Katherine',
  })
  borrowername: string;

  @IsNotEmpty()
  @ApiProperty()
  profilePic: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '12 Aug, 2022',
  })
  joinDate: string;

  @IsNumber()
  @ApiProperty({
    default: 14,
  })
  totalVideosUploaded: number;

  @IsNotEmpty()
  @ApiProperty({
    default: '12K',
  })
  followers: string;

  @IsNotEmpty()
  @ApiProperty({
    default: '4K',
  })
  following: string;

  @IsNotEmpty()
  @ApiProperty()
  requesterPublicKey: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'User 2X',
  })
  badgeType: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'Phantom',
  })
  walletType: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'live',
  })
  status: string;
}
