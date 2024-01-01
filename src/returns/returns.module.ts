import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from '../orders/orders.module';
import { Return } from './entities/return.entity';
import { ReturnsResolver } from './returns.resolver';
import { ReturnsService } from './returns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Return]), OrdersModule],
  providers: [ReturnsResolver, ReturnsService],
})
export class ReturnsModule {}
