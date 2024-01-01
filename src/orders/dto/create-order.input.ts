import { InputType, Int, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { OrderStatus, PaymentMode } from '../entities/order.entity';

@InputType()
export class CreateOrderInput {
  @Field(() => String, { description: 'User ID for which order is generated. Please send "1" as user Id for demo.' })
  userId: string;

  @Field(() => String, { description: 'Item ID for which order is generated. Please send "9" as user Id for demo.' })
  itemId: string;

  @Field(() => PaymentMode, {
    description: 'Mode of payment for the Order',
  })
  paymentMode: PaymentMode;

  @Field(() => String, {
    description: 'Address to which order is to be delivered',
  })
  deliveryAddress: string;
}
