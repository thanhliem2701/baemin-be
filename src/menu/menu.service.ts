import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(public prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto) {
    const { name, imgsrc, description } = createMenuDto;

    try {
      await this.prisma.menu.create({
        data: {
          name,
          imgsrc,
          description,
        }
      })
      return `Add new menu successfully !`;
    }
    catch (error) {
      console.error('Error creating menu:', error);
      return 'error: can not add menu, please contact to administrator !';
    }
  }

  findAll() {
    return this.prisma.menu.findMany();
  }

  findOne(id: number) {
    return this.prisma.menu.findFirst({ where: { id } });;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const { name, imgsrc, description } = updateMenuDto
    try {
      const updateData: any = {};
      if (name !== '') { updateData.name = name; }
      if (imgsrc !== '') { updateData.imgsrc = imgsrc; }
      if (description !== '') { updateData.description = description; }

      await this.prisma.menu.update({
        where: { id },
        data: {
          ...updateData,
        }
      });
      return `Update menu successfully !`;
    }
    catch (error) {
      console.error('Error updating menu:', error);
      return 'error: can not update menu, please contact to administrator !';
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.menu.delete({
        where: { id }
      });
      return `Delete menu successfully !`;
    }
    catch (error) {
      console.error('Error deleting menu:', error);
      return 'error: can not delete menu, please contact to administrator !';
    }
  }
}
