import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserInterface, UpdateUserDto } from './dto/create.dto';
import { UsersRepository } from './user.respository';
import { ErrorFormatService } from 'src/helpers/error-format/error-format.service';
import { MessageService } from 'src/helpers/message/message.service';

@Injectable()
export class UserService {
  constructor(
    private readonly users: UsersRepository,
    private readonly error: ErrorFormatService,
    private readonly message: MessageService,
  ) {}

  async create(data: CreateUserDto): Promise<CreateUserInterface> {
    const isExist = await this.users.getByIdUser(data.email, data.username);
    if (isExist) {
      this.error.throwError(
        400,
        this.message.DuplicateTransaction().responseCode,
        this.message.DuplicateTransaction().responseMessage,
      );
    }
    return await this.users.createUser(data);
  }

  async all(): Promise<CreateUserInterface[]> {
    const users = await this.users.find({
      select:{
        id:true,
        name:true,
        username:true,
        email:true,
        picture:true,
        createdAt:true,
        updatedAt:true
      }
    });
    return users;
  }

  async findById(id:string): Promise<CreateUserInterface>{  
    const user = await this.users.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        picture: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    if(!user){
      const mess = this.message.NoAccounts();
      const rc = mess.responseCode;
      const rd = mess.responseMessage;
      this.error.throwError(
        404,
        rc,
        rd
      )
    }
    return user;
  }
  async update(id: string, data: UpdateUserDto): Promise<CreateUserInterface> {
    const user = await this.users.findOne({ where: { id } });
  
    if (!user) {
      const mess = this.message.NoAccounts();
      this.error.throwError(404, mess.responseCode, mess.responseMessage);
    }

    const isExist = await this.users.getByIdUser(data.email, data.username);
    if (isExist) {
      this.error.throwError(
        400,
        this.message.DuplicateTransaction().responseCode,
        this.message.DuplicateTransaction().responseMessage,
      );
    }

    data.password = user.password; 
    await this.users.update({id:id}, {
      username:data.username,
      email:data.email,
      name:data.name,
      password:data.password,
      picture:data.picture
    });
  
    return {
      ...user,
      ...data,
    };
  }
  
  async delete(id:string): Promise<CreateUserInterface>{
    const isExist = await this.users.findOne({
      where:{
        id
      },
      select:{
        id: true,
        name: true,
        username: true,
        email: true,
        picture: true,
        createdAt: true,
        updatedAt: true, 
      }
    })
    if(!isExist){
      const mess = this.message.NoAccounts();
      const rc = mess.responseCode;
      const rd = mess.responseMessage;
      this.error.throwError(
        404,
        rc,
        rd
      )
    }
    await this.users.delete({id:id});
    return isExist;
  }

}
