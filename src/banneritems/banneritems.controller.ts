import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BanneritemsService } from './banneritems.service';
import { CreateBanneritemDto } from './dto/create-banneritem.dto';
import { UpdateBanneritemDto } from './dto/update-banneritem.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('banneritems')
export class BanneritemsController {
  constructor(private readonly banneritemsService: BanneritemsService) {}

  @Get()
  findAll() {
    return this.banneritemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.banneritemsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createBanneritemDto: CreateBanneritemDto) {
    return this.banneritemsService.create(createBanneritemDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBanneritemDto: UpdateBanneritemDto) {
    return this.banneritemsService.update(+id, updateBanneritemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banneritemsService.remove(+id);
  }
}
