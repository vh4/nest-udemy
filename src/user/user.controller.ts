import { Body, Controller, Header, HttpCode, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { MessageService } from 'src/helpers/message/message.service';

@Controller('/api/user')
export class UserController {
  constructor(
    private readonly user: UserService,
    private readonly message: MessageService,
  ) {}

  @Post()
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async create(
    @Body() data: CreateUserDto,
    @Req() req: Request,
  ): Promise<Record<string, string | number | Date>> {
    const response = await this.user.create(data);
    const message = this.message.Success();
    req.response = response;
    return {
      ...message,
      ...response,
    };
  }
}
