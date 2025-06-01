import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComboFoodsService } from './combo_foods.service';
import { CreateComboFoodDto } from './dto/create-combo_food.dto';
import { UpdateComboFoodDto } from './dto/update-combo_food.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('combo-foods')
export class ComboFoodsController {
  constructor(private readonly comboFoodsService: ComboFoodsService) {}

  @Get()
  findAll() {
    return this.comboFoodsService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.comboFoodsService.findOne(+id);
  }

  @Get('/promotion/:promotion_flag')
  findMany(@Param('promotion_flag') promotion_flag: string) {
    const flagArray: number[] = promotion_flag.split(',').map(Number);
    return this.comboFoodsService.findManyByPromotion(flagArray);
  }

  @Get('/name/:name')
  getComboFoodByName(@Param('name') key:string) {
    return this.comboFoodsService.getComboFoodByName(key);
  }

  @Get('/menu/:menu_id/branch/:branch_id')
  getComboFoodByMenu(@Param('menu_id') menu_id:number, @Param('branch_id') branch_id:number) {
    return this.comboFoodsService.getComboFoodByMenu(+menu_id,+branch_id);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createComboFoodDto: CreateComboFoodDto) {
    return this.comboFoodsService.create(createComboFoodDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComboFoodDto: UpdateComboFoodDto) {
    return this.comboFoodsService.update(+id, updateComboFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comboFoodsService.remove(+id);
  }
}
