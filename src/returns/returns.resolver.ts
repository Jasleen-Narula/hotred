import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateReturnInput } from './dto/create-return.input';
import { UpdateReturnInput } from './dto/update-return.input';
import { Return } from './entities/return.entity';
import { ReturnsService } from './returns.service';

@Resolver(() => Return)
export class ReturnsResolver {
  constructor(private readonly returnsService: ReturnsService) {}

  @Mutation(() => Return)
  createReturn(
    @Args('createReturnInput') createReturnInput: CreateReturnInput,
  ) {
    return this.returnsService.create(createReturnInput);
  }

  @Query(() => [Return], { name: 'returns' })
  findAll() {
    return this.returnsService.findAll();
  }

  @Query(() => Return, { name: 'return' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.returnsService.findOne(id);
  }

  @Mutation(() => Return)
  updateReturn(
    @Args('updateReturnInput') updateReturnInput: UpdateReturnInput,
  ) {
    return this.returnsService.update(updateReturnInput.id, updateReturnInput);
  }

  @Mutation(() => Return)
  removeReturn(@Args('id', { type: () => String }) id: string) {
    return this.returnsService.remove(id);
  }
}
