import { Module } from '@nestjs/common';
import { ComboFoodsService } from './combo_foods.service';
import { ComboFoodsController } from './combo_foods.controller';

@Module({
  controllers: [ComboFoodsController],
  providers: [ComboFoodsService],
})
export class ComboFoodsModule {}
