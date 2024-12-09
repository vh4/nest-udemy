import { Injectable } from '@nestjs/common';
import { Auth, UserAuth } from './dto/auth.dto';
import { AuthRepository } from './auth.repository';
import { MessageService } from '../helpers/message/message.service';
import { ErrorFormatService } from '../helpers/error-format/error-format.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private auth:AuthRepository,
		private message:MessageService,
		private err:ErrorFormatService,
		private jwt:JwtService
	){}
	async signIn(user:Auth): Promise<UserAuth>{
		const isExist = await this.auth.authLogin(user);
		const respFail = this.message.NoAccounts();
		if(!isExist){
			this.err.throwError(
				401,
				respFail.responseCode,
				respFail.responseMessage
			)
		}
		const verify = await bcrypt.compare(user.password, isExist.password);
		if(!verify){
			this.err.throwError(
				401,
				respFail.responseCode,
				respFail.responseMessage
			)
		}

		const payload = {
			username: isExist.username,
		  };

		  
		const accessToken = this.jwt.sign(payload);
		isExist.token = accessToken;

		await this.auth.update({id:isExist.id}, {
			token:accessToken
		})

		return isExist;
	}
}
