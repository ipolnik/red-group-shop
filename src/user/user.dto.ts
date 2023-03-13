import { IsEmail, IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsEmail()
    email: string
    
    @IsString()
    @IsOptional()
    password?: string

    @IsString()
    name: string

    @IsString()
    avatarPath: string

    @IsString()
    @IsOptional()
    phone?: string
}