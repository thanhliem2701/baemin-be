import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { BranchmenuService } from './branchmenu.service';
import { CreateBranchmenuDto } from './dto/create-branchmenu.dto';
import { UpdateBranchmenuDto } from './dto/update-branchmenu.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('branchmenu')
export class BranchmenuController {
  constructor(private readonly branchmenuService: BranchmenuService) {}

  @Post()
  create(@Body() createBranchmenuDto: CreateBranchmenuDto) {
    return this.branchmenuService.create(createBranchmenuDto);
  }

  @Get()
  findAll() {
    return this.branchmenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchmenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchmenuDto: UpdateBranchmenuDto) {
    return this.branchmenuService.update(+id, updateBranchmenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchmenuService.remove(+id);
  }
}
