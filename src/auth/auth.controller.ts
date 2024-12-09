import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuth, UserAuthDto } from './dto/auth.dto';
import { Request } from 'express';
import { MessageService } from '../helpers/message/message.service';

@Controller('/api/auth')
export class AuthController {
	constructor(
		private auth:AuthService,
		private message:MessageService
	){}

	@Post()
	async signIn(
		@Body() user: UserAuthDto,
		@Req() req:Request
	): Promise<Record<string, string|UserAuth>>{
		const response = await this.auth.signIn(user);
		req.response = response;
		return{
			...this.message.Success(),
			data:response
		}
	}
}
