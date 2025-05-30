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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comboFoodsService.findOne(+id);
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
