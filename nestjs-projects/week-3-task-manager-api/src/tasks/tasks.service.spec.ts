import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: {
    task: {
      create: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      task: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task with the given data', async () => {
      const dto = {
        title: 'Write tests',
        description: 'Cover the service layer',
      };
      prisma.task.create.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);

      expect(prisma.task.create).toHaveBeenCalledWith({ data: dto });
      expect(result).toEqual({ id: 1, ...dto });
    });
  });

  describe('findOne', () => {
    it('should return the task when it exists', async () => {
      const task = { id: 1, title: 'Existing task' };
      prisma.task.findUnique.mockResolvedValue(task);

      const result = await service.findOne(1);

      expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(task);
    });

    it('should throw NotFoundException when the task does not exist', async () => {
      prisma.task.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update the task with the given data', async () => {
      const updateDto = { title: 'Updated title' };
      prisma.task.findUnique.mockResolvedValue({ id: 1, title: 'Old title' });
      prisma.task.update.mockResolvedValue({ id: 1, ...updateDto });

      const result = await service.update(1, updateDto);

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
      expect(result).toEqual({ id: 1, ...updateDto });
    });

    it('should throw NotFoundException when updating a task that does not exist', async () => {
      prisma.task.findUnique.mockResolvedValue(null);

      await expect(service.update(999, { title: 'x' } as any)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete the task after confirming it exists', async () => {
      const task = { id: 1, title: 'To delete' };
      prisma.task.findUnique.mockResolvedValue(task);
      prisma.task.delete.mockResolvedValue(task);

      const result = await service.remove(1);

      expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(task);
    });

    it('should throw NotFoundException when trying to delete a task that does not exist', async () => {
      prisma.task.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
