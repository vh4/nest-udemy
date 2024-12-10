import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import { AuthRepository } from "./auth.repository";
import { MessageService } from "src/helpers/message/message.service";
import { ErrorFormatService } from "src/helpers/error-format/error-format.service";
import { UserAuth } from "./dto/auth.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy){
	constructor(
		private auth:AuthRepository,
		private message:MessageService,
		private err:ErrorFormatService
	){
		super({
			secretOrKey:'secretBoy',
			jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
		});
	}

	async validate(payload:{username:string}): Promise<UserAuth>{
		const {username} = payload;
		const isExist = await this.auth.findByUsername(username);
		if(!isExist){
			const er = this.message.TransactionNotPermittedToTerminal();
			this.err.throwError(
				401,
				er.responseCode,
				er.responseMessage
			)
		}
		return isExist;
	}
}