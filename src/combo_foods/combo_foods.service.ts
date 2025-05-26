import { Injectable } from '@nestjs/common';
import { CreateComboFoodDto } from './dto/create-combo_food.dto';
import { UpdateComboFoodDto } from './dto/update-combo_food.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ComboFoodsService {
  prisma = new PrismaClient();

  async create(createComboFoodDto: CreateComboFoodDto) {
    const { menu_id, name, description, price,img,promotion_flag } = createComboFoodDto;

    try {
      await this.prisma.combo_foods.create({
        data: {
          menu_id,
          name,
          description,
          price,
          img,
          promotion_flag
        }
      })
      return `Add new combo or food successfully !`;
    }
    catch (error) {
      console.error('Error creating combo or food :', error);
      return 'error: can not add combo or food, please contact to administrator !';
    }
  }

  findAll() {
    return this.prisma.combo_foods.findMany();
  }

  findOne(id: number) {
    return this.prisma.combo_foods.findFirst({ where: { id } });
  }

  async update(id: number, updateComboFoodDto: UpdateComboFoodDto) {
    const { menu_id, name, description, price,img,promotion_flag } = updateComboFoodDto;
    try {
      const updateData: any = {};
      if (menu_id !== 0) { updateData.menu_id = menu_id; }
      if (name !== '') { updateData.name = name; }
      if (description !== '') { updateData.description = description; }
      if (price > 0 ) { updateData.price = price; }
      if (img !== '') { updateData.img = img; }
      if (promotion_flag > 0 && promotion_flag < 4) { updateData.promotion_flag = promotion_flag; }

      await this.prisma.combo_foods.update({
        where: { id },
        data: {
          ...updateData,
        }
      });
      return `Update combo or food successfully !`;
    }
    catch (error) {
      console.error('Error updating combo or food:', error);
      return 'error: can not update combo or food, please contact to administrator !';
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.combo_foods.delete({
        where: { id }
      });
      return `Delete combo or food successfully !`;
    }
    catch (error) {
      console.error('Error deleting combo or food :', error);
      return 'error: can not delete combo or food, please contact to administrator !';
    }
  }
}
