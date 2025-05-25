import { PartialType } from '@nestjs/mapped-types';
import { CreateComboFoodDto } from './create-combo_food.dto';

export class UpdateComboFoodDto extends PartialType(CreateComboFoodDto) {
    id: number
    menu_id: number
    name: string
    description: string
    price: number
    img: string
    promotion_flag: number
}
