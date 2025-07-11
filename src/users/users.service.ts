import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(public prisma: PrismaService) {}

  // create a new user
  async create(createUserDto: CreateUserDto) {
    const { first_name, last_name, username, phone, email, password } = createUserDto;
    // use bycrypt saltRounds to hash the password
    const saltRounds = 10;
    // encrypt the password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      // insert the new user into the database
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

  // find user by username use for login function
  findOne(username: string) {
    return this.prisma.users.findFirst({ where: { username } });
  }

  //update user info
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { first_name, last_name, phone, email, password } = updateUserDto;

    try {
      const updateData: any = {};
      if (first_name !== '') { updateData.first_name = first_name; }
      if (last_name !== '') { updateData.last_name = last_name; }
      if (phone !== '') { updateData.phone = phone; }
      if (email !== '') { updateData.email = email; }
      if (password !== '') {
        // use bycrypt saltRounds to hash the password
        const saltRounds = 10;
        // encrypt the password before saving
        updateData.password = await bcrypt.hash(password, saltRounds);
      }
      // update the user info in the database
      await this.prisma.users.update({
        where: { id },
        data: {
          ...updateData,
        }
      });
      return `Update user info successfully !`;
    }
    catch (error) {
      console.error('Error updating user info:', error);
      return 'error: can not update user info, please contact to administrator !';
    }
  }
}
