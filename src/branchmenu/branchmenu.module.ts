import { Module } from '@nestjs/common';
import { BranchmenuService } from './branchmenu.service';
import { BranchmenuController } from './branchmenu.controller';

@Module({
  controllers: [BranchmenuController],
  providers: [BranchmenuService],
})
export class BranchmenuModule {}
