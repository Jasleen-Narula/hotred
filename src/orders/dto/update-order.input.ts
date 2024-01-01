import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType, PickType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput extends PartialType(PickType(CreateOrderInput, ['userId', 'paymentMode', 'deliveryAddress'])) {
  @Field(() => String)
  id: string;
}
