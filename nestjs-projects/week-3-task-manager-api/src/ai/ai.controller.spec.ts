import { Test, TestingModule } from '@nestjs/testing';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

describe('AiController', () => {
  let controller: AiController;
  let aiService: {
    generateResponse: jest.Mock;
    generateSupportResponse: jest.Mock;
    getSupportHistory: jest.Mock;
  };

  beforeEach(async () => {
    aiService = {
      generateResponse: jest.fn(),
      generateSupportResponse: jest.fn(),
      getSupportHistory: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiController],
      providers: [{ provide: AiService, useValue: aiService }],
    }).compile();

    controller = module.get<AiController>(AiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('testPrompt', () => {
    it('should return the response from the AI service wrapped in an object', async () => {
      aiService.generateResponse.mockResolvedValue('Hello there');

      const result = await controller.testPrompt({ prompt: 'Say hello' });

      expect(aiService.generateResponse).toHaveBeenCalledWith('Say hello');
      expect(result).toEqual({ response: 'Hello there' });
    });
  });

  describe('supportQuery', () => {
    it('should call the AI service with the prompt and the current user id', async () => {
      const mockResult = {
        response: 'Fixed',
        category: 'Technical',
        priority: 'Low',
      };
      aiService.generateSupportResponse.mockResolvedValue(mockResult);

      const result = await controller.supportQuery(
        { prompt: 'It is broken' },
        { id: 5 },
      );

      expect(aiService.generateSupportResponse).toHaveBeenCalledWith(
        'It is broken',
        5,
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('supportHistory', () => {
    it('should call the AI service with the current user id', async () => {
      const mockHistory = [{ id: 1, query: 'test' }];
      aiService.getSupportHistory.mockResolvedValue(mockHistory);

      const result = await controller.supportHistory({ id: 5 });

      expect(aiService.getSupportHistory).toHaveBeenCalledWith(5);
      expect(result).toEqual(mockHistory);
    });
  });
});
