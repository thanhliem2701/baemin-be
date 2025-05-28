import { Module } from '@nestjs/common';
import { ComboFoodsService } from './combo_foods.service';
import { ComboFoodsController } from './combo_foods.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [ComboFoodsController],
  providers: [ComboFoodsService],
})
export class ComboFoodsModule {}
