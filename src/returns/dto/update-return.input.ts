import { Field, ID, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateReturnInput } from './create-return.input';

@InputType()
export class UpdateReturnInput extends PartialType(
  PickType(CreateReturnInput, ['userId']),
) {
  @Field(() => ID, { description: 'Order ID for which return is generated' })
  id: string;

  @Field(() => String, {
    description: 'What is reason of the return?',
    nullable: true,
  })
  reason?: string;
}
