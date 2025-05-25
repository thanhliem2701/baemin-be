import { Module } from '@nestjs/common';
import { BanneritemsService } from './banneritems.service';
import { BanneritemsController } from './banneritems.controller';

@Module({
  controllers: [BanneritemsController],
  providers: [BanneritemsService],
})
export class BanneritemsModule {}
