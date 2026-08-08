import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MonitorsController } from './monitors.controller';
import { MonitorsService } from './monitors.service';

describe('MonitorsController', () => {
  let controller: MonitorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitorsController],
      providers: [
        { provide: MonitorsService, useValue: {} },
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    controller = module.get<MonitorsController>(MonitorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
