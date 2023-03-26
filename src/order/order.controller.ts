import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/authorization/decorators/auth.decorator';
import { CurrentUser } from 'src/authorization/decorators/user.decorator';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  getAll(@CurrentUser('id') userId: number) {
    return this.orderService.getAll(userId)
  }
}
