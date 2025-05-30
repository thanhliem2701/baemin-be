import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: number
    first_name: string
    last_name: string
    username: string
    phone: string
    email: string
    password: string
}
