import { Test, TestingModule } from '@nestjs/testing';
import { ReturnsResolver } from './returns.resolver';
import { ReturnsService } from './returns.service';

describe('ReturnsResolver', () => {
  let resolver: ReturnsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReturnsResolver, ReturnsService],
    }).compile();

    resolver = module.get<ReturnsResolver>(ReturnsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
