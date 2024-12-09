import { IsNotEmpty } from "class-validator";

export interface Auth{
	username:string,
	password:string
}

export interface UserAuth {
	id?:string;
	name: string;
	username: string;
	email: string;
	password: string;
	picture?: string;
	token?: string;
}

export class UserAuthDto{
	@IsNotEmpty()
	username: string;
	@IsNotEmpty()
	password: string;
}
  