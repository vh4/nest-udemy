import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserInterface } from './dto/create.dto';
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
}
