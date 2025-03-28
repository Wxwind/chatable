import { Test, TestingModule } from '@nestjs/testing';
import { UserThirdAuthService } from './user-third-auth.service';

describe('UserThirdAuthService', () => {
  let service: UserThirdAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserThirdAuthService],
    }).compile();

    service = module.get<UserThirdAuthService>(UserThirdAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
