import { Test, TestingModule } from '@nestjs/testing';
import { PrivateChatGateway } from './private-chat.gateway';
import { MessagesService } from './messages.service';

describe('MessagesGateway', () => {
  let gateway: PrivateChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivateChatGateway, MessagesService],
    }).compile();

    gateway = module.get<PrivateChatGateway>(PrivateChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
