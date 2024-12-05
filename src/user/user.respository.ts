import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserInterface } from './dto/create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getByIdUser(email: string, username: string) {
    return await this.createQueryBuilder('user')
      .where('user.email = :email or user.username = :username', {
        email: email,
        username: username,
      })
      .getOne();
  }

  async createUser(data: CreateUserDto): Promise<CreateUserInterface> {
    data.password = await bcrypt.hash(data.password, 10);
    const user = this.create(data);
    return await this.save(user);
  }
}
