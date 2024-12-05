import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export interface CreateUserInterface {
  name: string;
  username: string;
  email: string;
  password: string;
  picture?: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CreateUserDto {
  @IsNotEmpty()
  @Length(5, 100)
  name: string;

  @IsNotEmpty()
  @Length(5, 100)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 25)
  password: string;

  @IsOptional()
  picture?: string;

  @IsOptional()
  token?: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
