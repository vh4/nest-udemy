import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export interface CreateUserInterface {
  id?:string;
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

export class UpdateUserDto {
  @IsNotEmpty()
  @Length(5, 100)
  name: string;

  @IsNotEmpty()
  @Length(5, 100)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  picture?: string;

  @IsOptional()
  @Length(8, 25)
  password: string;
  
}