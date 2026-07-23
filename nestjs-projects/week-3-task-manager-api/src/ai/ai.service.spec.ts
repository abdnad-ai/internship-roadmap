import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { AiService } from './ai.service';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: jest.fn().mockResolvedValue({
          response: {
            text: () =>
              JSON.stringify({
                response: 'Mocked support response',
                category: 'Technical',
                priority: 'Medium',
              }),
          },
        }),
      }),
    })),
  };
});

describe('AiService', () => {
  let service: AiService;
  let prisma: {
    supportConversation: { create: jest.Mock; findMany: jest.Mock };
  };

  beforeEach(async () => {
    prisma = {
      supportConversation: {
        create: jest.fn().mockResolvedValue({}),
        findMany: jest.fn().mockResolvedValue([]),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('fake-api-key'),
          },
        },
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateResponse', () => {
    it('should throw BadRequestException for an empty prompt', async () => {
      await expect(service.generateResponse('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for a prompt that is too long', async () => {
      const longPrompt = 'a'.repeat(3000);
      await expect(service.generateResponse(longPrompt)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('generateSupportResponse', () => {
    it('should throw BadRequestException for an empty query', async () => {
      await expect(service.generateSupportResponse('', 1)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return a structured response and save the conversation', async () => {
      const result = await service.generateSupportResponse(
        'My payment failed',
        1,
      );

      expect(result).toEqual({
        response: 'Mocked support response',
        category: 'Technical',
        priority: 'Medium',
      });
      expect(prisma.supportConversation.create).toHaveBeenCalledTimes(1);
      expect(prisma.supportConversation.create).toHaveBeenCalledWith({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: expect.objectContaining({
          query: 'My payment failed',
          response: 'Mocked support response',
          category: 'Technical',
          priority: 'Medium',
          userId: 1,
        }),
      });
    });
  });

  describe('getSupportHistory', () => {
    it('should query conversations for the given user, newest first', async () => {
      await service.getSupportHistory(7);

      expect(prisma.supportConversation.findMany).toHaveBeenCalledWith({
        where: { userId: 7 },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
