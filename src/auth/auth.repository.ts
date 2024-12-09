import { Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { DataSource, Repository } from "typeorm";
import { Auth, UserAuth } from "./dto/auth.dto";

@Injectable()
export class AuthRepository extends Repository<User>{
	constructor(
		private auth: DataSource
	){
		super(User, auth.createEntityManager());
	}
	async authLogin(auth:Auth): Promise<UserAuth>{
		return this.findOne({
			where:{
				username:auth.username
			},
		})
	}
}