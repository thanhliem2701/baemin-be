import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    id: number
    user_id: number
    user_name: string
    user_phone: string
    delivery_address: string
    total_price : number
    del_flag : number
    discount_code : string
    discount_amount: number
}
