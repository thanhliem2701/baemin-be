import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationService } from '../common/validation/validation.service';
import { messages } from 'src/constants/messages';


@Injectable()
export class OrdersService {
  constructor(
    public prisma: PrismaService,
    private readonly validationService: ValidationService,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const { user_id, user_name, user_phone, delivery_address, total_price, discount_code, discount_amount, orderDetails } = createOrderDto;

    if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
      throw new BadRequestException(messages.ORDER_ERROR);
    }

    return this.prisma.orders.create({
      data: {
        user_id,
        user_name,
        user_phone,
        delivery_address,
        total_price,
        discount_code,
        discount_amount,
        order_detail: {
          create: orderDetails.map((detail) => ({
            food_id: detail.food_id,
            name: detail.name,
            quantity: detail.quantity,
            amount: detail.amount,
          })),
        },
      },
      include: {
        order_detail: true,
      },
    });
  }
}
