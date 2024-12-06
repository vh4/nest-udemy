import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Req } from '@nestjs/common';
import { CreateUserDto, CreateUserInterface, UpdateUserDto } from './dto/create.dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { MessageService } from 'src/helpers/message/message.service';

@Controller('/api/user/')
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

  @Get('/')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async all(): Promise<Record<string, CreateUserInterface[]|string>>{
    const response = await this.user.all();
    const message = this.message.Success();
    return {
      ...message,
      data:response,
    };
  }

  @Get(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async find(
    @Param('id') id:string,
    @Req() req:Request
  ): Promise<Record<string, CreateUserInterface|string>>{
     const response = await this.user.findById(id)
     req.response = response;
     const message = this.message.Success();
     return {
       ...message,
       data:response,
     };
  }

  @Post(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async update(
    @Body() data: UpdateUserDto,
    @Param('id') id:string,
    @Req() req:Request 
  ): Promise<Record<string, CreateUserInterface|string>>{
      const response = await this.user.update(id, data);
      req.response = response;
      const message = this.message.Success();
      return {
        ...message,
        data:response,
      };
  }

  @Delete(':id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async delete(
    @Param('id') id:string,
    @Req() req:Request
  ): Promise<Record<string, string|CreateUserInterface>>{
    const response = await this.user.delete(id);
    req.response = response;
    const message = this.message.Success();
    return {
      ...message,
      data:response,
    };
  }

}
