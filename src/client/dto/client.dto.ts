import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ClientDto {
    @IsString({
        message: 'Username must be a string',
    })
    @IsNotEmpty({
        message: 'Username is required',
    })
    username!: string;

    @IsEmail({}, {
        message: 'Email must be a valid email',
    })
    @IsNotEmpty({
        message: 'Email is required',
    })
    email!: string;

    @IsString({
        message: 'Password must be a string',
    })
    @IsNotEmpty({
        message: 'Password is required',
    })
    password!: string;
}