import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum ReturnStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
}

registerEnumType(ReturnStatus, { name: 'ReturnStatus' });

@Entity()
@ObjectType({ description: 'Return model' })
export class Return {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Unique identifier of the return' })
  id: string;

  @Column()
  @Field(() => String, { description: 'Order ID for which return is generated' })
  orderId: string;

  @Column()
  @Field(() => String, { description: 'What is reason of the return?' })
  reason: string;

  @Column({ default: new Date() })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Column({ default: ReturnStatus.PENDING })
  @Field(() => ReturnStatus, {
    description: 'Status of the Return',
    defaultValue: ReturnStatus.PENDING,
  })
  status: ReturnStatus;
}
