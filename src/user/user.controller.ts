import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';

@Controller('user')
export class UserController {
	constructor(){}

	@Post('/api/user')
	@HttpCode(200)
	@Header('Content-Type', 'applciation/json')
	async create(
		@Body() data:CreateUserDto
	):Promise<Record<string, string|number>>{

		return {}

	}

}
