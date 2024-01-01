import {
  Injectable,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRespository: Repository<Order>,
  ) {}

  create(createOrderInput: CreateOrderInput) {
    const { userId, itemId, paymentMode, deliveryAddress } = createOrderInput;

    /**
     * This is a fake check to see if the user is valid or not.
     */
    if (userId !== '1') {
      throw new UnauthorizedException('Invalid user');
    }

    /**
     * This is a fake check to see if the item is valid or not.
     */
    if (itemId !== '9') {
      throw new NotFoundException('Item does not exist');
    }

    const entity = this.orderRespository.create({
      userId,
      itemId,
      paymentMode,
      deliveryAddress,
    });

    return this.orderRespository.save(entity);
  }

  findAll() {
    return this.orderRespository.find();
  }

  async findOne(id: string) {
    const entity = this.orderRespository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Order does not exist');
    }

    return entity;
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    const order = await this.findOne(id);

    if (!order) {
      throw new NotFoundException('Order does not exist');
    }

    const updatedOrder: Order = { ...order, ...updateOrderInput };

    return this.orderRespository.save(updatedOrder);
  }

  remove(id: string) {
    throw new NotImplementedException();
  }
}
