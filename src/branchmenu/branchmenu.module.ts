import { Module } from '@nestjs/common';
import { BranchmenuService } from './branchmenu.service';
import { BranchmenuController } from './branchmenu.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [BranchmenuController],
  providers: [BranchmenuService],
})
export class BranchmenuModule {}
