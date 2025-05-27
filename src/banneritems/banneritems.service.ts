import { Injectable } from '@nestjs/common';
import { CreateBanneritemDto } from './dto/create-banneritem.dto';
import { UpdateBanneritemDto } from './dto/update-banneritem.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BanneritemsService {
  constructor(public prisma: PrismaService) {}
  
  async create(createBanneritemDto: CreateBanneritemDto) {
    const  { name ,imgsrc, url } = createBanneritemDto
    try {
      await this.prisma.banneritems.create({
        data: {
          name,
          imgsrc,
          url,
        }
      })
      return `Add new banner item successfully !`;
    }
    catch (error) {
      console.error('Error creating banner item:', error);
      return 'error: can not add banner item, please contact to administrator !';
    }
  }

  findAll() {
    return this.prisma.banneritems.findMany();
  }

  findOne(id: number) {
    return this.prisma.banneritems.findFirst({ where: { id } });;
  }

  async update(id: number, updateBanneritemDto: UpdateBanneritemDto) {
    const { name, imgsrc, url } = updateBanneritemDto
    try {
      const updateData: any = {};
      if (name !== '') { updateData.name = name; }
      if (imgsrc !== '') { updateData.imgsrc = imgsrc; }
      if (url !== '') { updateData.description = url; }

      await this.prisma.banneritems.update({
        where: { id },
        data: {
          ...updateData,
        }
      });
      return `Update banner item successfully !`;
    }
    catch (error) {
      console.error('Error updating banner item:', error);
      return 'error: can not update banner item, please contact to administrator !';
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.banneritems.delete({
        where: { id }
      });
      return `Delete banner item successfully !`;
    }
    catch (error) {
      console.error('Error deleting banner item:', error);
      return 'error: can not delete banner item, please contact to administrator !';
    }
  }
}
