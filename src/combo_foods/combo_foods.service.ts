import { Injectable } from '@nestjs/common';
import { CreateComboFoodDto } from './dto/create-combo_food.dto';
import { UpdateComboFoodDto } from './dto/update-combo_food.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationService } from '../common/validation/validation.service';
import { messages } from 'src/constants/messages';

@Injectable()
export class ComboFoodsService {
  constructor(
    public prisma: PrismaService,
    private readonly validationService: ValidationService,
  ) { }

  async create(createComboFoodDto: CreateComboFoodDto) {
    const { menu_id, name, description, price, img, promotion_flag, tag } = createComboFoodDto;

    //validate id
    const valid_menuId = this.validationService.validateId(menu_id, messages.MENU_ID_NULL);
    this.validationService.validateRequired(name, messages.NAME_NULL);
    this.validationService.validatePrice(price, messages.PRICE_NULL);

    try {
      await this.prisma.combo_foods.create({
        data: {
          menu_id: valid_menuId,
          name,
          description,
          price,
          img,
          promotion_flag,
          tag,
        }
      })
      return messages.ADD_COMBO_FOOD_SUCCESSFUL;
    }
    catch (error) {
      return messages.ADD_COMBO_FOOD_FAIL;
    }
  }

  findAll() {
    return this.prisma.combo_foods.findMany();
  }

  findOne(id: number) {
    //validate id
    const validId = this.validationService.validateId(id, messages.COMOBO_FOOD_ID_NULL);
    return this.prisma.combo_foods.findFirst({ where: { id: validId } });
  }
  //find many item/food on promotion flag
  findManyByPromotion(promotion_flag: number[]) {
    //validate array
    if (!promotion_flag || !Array.isArray(promotion_flag) || promotion_flag.length === 0) {
      throw new Error(messages.PROMOTION_FLAG_NULL);
    }
    // 0: combo, 1: promotion,2: new dish,3: others
    const allowedFlags = [0, 1, 2, 3];
    // check if any invalid flag existed in array 
    const invalidFlags = promotion_flag.filter(flag => !allowedFlags.includes(flag));
    if (invalidFlags.length > 0) {
      throw new Error(messages.PROMOTION_FLAG_INVALID);
    }
    return this.prisma.combo_foods.findMany({
      where: {
        promotion_flag: {
          in: promotion_flag
        }
      }
    });
  }
  // get all combo or foods ny name
  async getComboFoodByName(name: string) {
    const searchKey = name.trim().toLowerCase();
    return this.prisma.combo_foods.findMany({
      where: {
        name: {
          contains: searchKey,
          mode: 'insensitive',
        },
      },
    });
  }

  //get Combo or food by menu
  async getComboFoodByMenu(menu_id: number, branch_id: number) {
    //Get all Combo or food by branch
    if (menu_id === -1) {
      this.validationService.validateId(branch_id, messages.BRANCHID_NULL);
      return await this.prisma.combo_foods.findMany({
        where: {
          branchmenu: {
            branch_id: branch_id,
          },
        },
      })
    }
    else {
      //validate id
      const valid_menuId = this.validationService.validateId(menu_id, messages.MENU_ID_NULL);
      return await this.prisma.combo_foods.findMany({
        where: {
          menu_id: valid_menuId,
        },
      });
    }
  }

  async update(id: number, updateComboFoodDto: UpdateComboFoodDto) {
    const { menu_id, name, description, price, img, promotion_flag } = updateComboFoodDto;
    try {
      const updateData: any = {};
      if (menu_id !== 0) { updateData.menu_id = menu_id; }
      if (name !== '') { updateData.name = name; }
      if (description !== '') { updateData.description = description; }
      if (price > 0) { updateData.price = price; }
      if (img !== '') { updateData.img = img; }
      if (promotion_flag > 0 && promotion_flag < 4) { updateData.promotion_flag = promotion_flag; }

      await this.prisma.combo_foods.update({
        where: { id },
        data: {
          ...updateData,
        }
      });
      return messages.UPD_COMBO_FOOD_SUCCESSFUL;
    }
    catch (error) {
      return messages.UPD_COMBO_FOOD_FAIL;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.combo_foods.delete({
        where: { id }
      });
      return messages.DEL_COMBO_FOOD_SUCCESSFUL;
    }
    catch (error) {
      return messages.DEL_COMBO_FOOD_FAIL;
    }
  }
}
