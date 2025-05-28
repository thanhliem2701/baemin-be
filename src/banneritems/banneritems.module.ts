import { Module } from '@nestjs/common';
import { BanneritemsService } from './banneritems.service';
import { BanneritemsController } from './banneritems.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [BanneritemsController],
  providers: [BanneritemsService],
})
export class BanneritemsModule {}
