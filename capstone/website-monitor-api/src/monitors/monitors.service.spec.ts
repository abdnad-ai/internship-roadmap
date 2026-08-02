import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MonitorsService } from './monitors.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

describe('MonitorsService', () => {
  let service: MonitorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonitorsService,
        { provide: PrismaService, useValue: {} },
        { provide: EmailService, useValue: {} },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) =>
              key === 'GEMINI_API_KEY' ? 'test-key' : undefined,
            ),
          },
        },
      ],
    }).compile();

    service = module.get<MonitorsService>(MonitorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
