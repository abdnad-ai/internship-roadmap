import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({ data: createTaskDto });
  }

 async findAll(query: QueryTaskDto) {
    const { search, completed, sort, order } = query;

    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(query.limit) || 5, 1), 100);
    const skip = (page - 1) * limit; 

    const where: any = {};

    if (search) {
      const words = search.trim().split(/\s+/);
      where.AND = words.map((word) => ({
        OR: [
          { title: { contains: word, mode: 'insensitive' } },
          { description: { contains: word, mode: 'insensitive' } },
        ],
      }));
    }

    if (completed === 'true') {
      where.completed = true;
    } else if (completed === 'false') {
      where.completed = false;
    }

    const orderBy = { [sort || 'createdAt']: order || 'desc' };

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({ where, orderBy, skip, take: limit }),
      this.prisma.task.count({ where }),
    ]);

    return {
      data: tasks,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  } 

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.task.delete({ where: { id } });
  }
} 