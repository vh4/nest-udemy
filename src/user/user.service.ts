import { Injectable } from '@nestjs/common';
import { CreateUserInterface } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity'; // Assuming you have a User entity
import { UserRepository } from './user.respository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  async create(data: CreateUserInterface): Promise<User> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }
}
