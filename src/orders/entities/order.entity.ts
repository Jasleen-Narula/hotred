import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentMode {
  COD = 'cod',
  ONLINE = 'online',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });
registerEnumType(PaymentMode, { name: 'PaymentMode' });

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Unique identifier of the order' })
  id: string;

  @Column()
  @Field(() => String, { description: 'User ID for which order is generated' })
  userId: string;

  @Column()
  @Field(() => String, { description: 'Item ID for which order is generated' })
  itemId: string;

  @Column({ default: new Date() })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Column({ default: OrderStatus.PENDING })
  @Field(() => OrderStatus, {
    description: 'Status of the Order',
  })
  status: OrderStatus;

  @Column()
  @Field(() => PaymentMode, {
    description: 'Mode of payment for the Order',
  })
  paymentMode: PaymentMode;

  @Column()
  @Field(() => String, {
    description: 'Address to which order is to be delivered',
  })
  deliveryAddress: string;
}
