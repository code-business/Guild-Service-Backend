import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RaiseBadgeRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    default: '2FeSUo4dxqiSJeH3zj2gMe2Mc4wehCYGn66Bx4tS6Cup',
  })
  requesterPublicKey: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'Creator',
  })
  badgeType: string;
}
