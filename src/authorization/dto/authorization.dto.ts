import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail()
    email: string

    @MinLength(6, {message: 'Password length must be at least 6 char long!'})
    @IsString()
    password : string
}

