import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Abdullah', email: 'abdullah@test.com' },
    { id: 2, name: 'guler', email: 'guler@test.com' },
    { id: 3, name: 'anthony', email: 'anthony@test.com' },
  ];

  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      name: createUserDto.name,
      email: createUserDto.email,
    };
    this.users.push(newUser);
    return { message: 'User created successfully', user: newUser };
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((u) => u.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return { message: `User ${id} updated`, changes: updateUserDto };
  }

  remove(id: number) {
    this.users = this.users.filter((u) => u.id !== id);
    return { message: `User ${id} removed` };
  }
}  