import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Abdullah',
      role: 'Frontend Builder',
      skillFocus: 'Next.js routes',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Sara',
      role: 'API Planner',
      skillFocus: 'NestJS controllers',
      status: 'Active',
    },
  ];

  findAll() {
    return {
      message: 'All users fetched successfully',
      data: this.users,
    };
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    return {
      message: user ? 'User found successfully' : 'User not found',
      data: user || null,
    };
  }

  create(userData: {
    name: string;
    role: string;
    skillFocus: string;
    status: string;
  }) {
    const newUser = {
      id: this.users.length + 1,
      ...userData,
    };

    this.users.push(newUser);

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  update(
    id: number,
    userData: {
      name?: string;
      role?: string;
      skillFocus?: string;
      status?: string;
    },
  ) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return {
        message: 'User not found',
        data: null,
      };
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
    };

    return {
      message: 'User updated successfully',
      data: this.users[userIndex],
    };
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return {
        message: 'User not found',
        data: null,
      };
    }

    const deletedUser = this.users.splice(userIndex, 1);

    return {
      message: 'User deleted successfully',
      data: deletedUser[0],
    };
  }
} 