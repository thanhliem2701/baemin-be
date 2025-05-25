import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  prisma = new PrismaClient();

  async create(createUserDto: CreateUserDto) {
    const { first_name, last_name, username, phone, email, password } = createUserDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      await this.prisma.users.create({
        data: {
          first_name,
          last_name,
          username,
          phone,
          email,
          password: hashedPassword, 
        }
      })
      return `Add new user successfully !`;
    }
    catch (error) {
      console.error('Error creating user:', error);
      return 'error: can not add user, please contact to administrator !';
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
