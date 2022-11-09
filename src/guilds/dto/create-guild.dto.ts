/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class CreateGuildDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    age: string;
}
