/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGuildDto {
    @IsNotEmpty()
    @ApiProperty({
        default: 'Rahul Patil',
    })
    name: string;

    @IsNotEmpty()
    @ApiProperty({
        default: 24
    })
    age: string;
}
