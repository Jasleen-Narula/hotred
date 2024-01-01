import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReturnInput {
  @Field(() => String, {
    description: 'Order ID for which return is generated',
  })
  orderId: string;

  @Field(() => String, { description: 'What is reason of the return?' })
  reason: string;

  @Field(() => String, {
    description:
      'User ID for which return is generated. Please send "1" as user Id for demo.',
  })
  userId: string;
}
