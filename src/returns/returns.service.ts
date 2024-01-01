import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersService } from './../orders/orders.service';
import { CreateReturnInput } from './dto/create-return.input';
import { UpdateReturnInput } from './dto/update-return.input';
import { Return } from './entities/return.entity';

@Injectable()
export class ReturnsService {
  constructor(
    @InjectRepository(Return)
    private returnRespository: Repository<Return>,
    private ordersService: OrdersService,
  ) {}

  async create(createReturnInput: CreateReturnInput) {
    const { orderId, reason, userId } = createReturnInput;

    /**
     * This is a fake check to see if the user is valid or not.
     */
    if (userId !== '1') {
      throw new UnauthorizedException('Invalid user');
    }

    const order = await this.ordersService.findOne(orderId);

    if (!order) {
      throw new NotFoundException('Order does not exist');
    }

    const existingReturn = await this.returnRespository.findOne({
      where: { orderId },
    });

    if (existingReturn) {
      throw new ConflictException('Return already generated');
    }

    const entity = this.returnRespository.create({
      orderId,
      reason,
    });

    return this.returnRespository.save(entity);
  }

  findAll() {
    return this.returnRespository.find();
  }

  async findOne(id: string) {
    const entity = await this.returnRespository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Return not found');
    }

    return entity;
  }

  async update(id: string, updateReturnInput: UpdateReturnInput) {
    const entity = await this.findOne(id);

    if (!entity) {
      return {
        message: 'Return not found',
        code: 'NOT_FOUND',
      };
    }

    const updatedEntity: Return = {
      ...entity,

      reason: updateReturnInput.reason,
    };

    return this.returnRespository.save(updatedEntity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    if (!entity) {
      throw new NotFoundException('Return not found');
    }

    await this.returnRespository.delete({ id });

    return entity;
  }
}
