import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @IsNumber()
    age: number;

    @IsString()
    @IsOptional()
    avatarUrl?: string;
}