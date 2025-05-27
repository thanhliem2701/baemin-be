import { Injectable } from '@nestjs/common';
import { CreateBranchmenuDto } from './dto/create-branchmenu.dto';
import { UpdateBranchmenuDto } from './dto/update-branchmenu.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BranchmenuService {
  constructor(public prisma: PrismaService) {}

  async create(createBranchmenuDto: CreateBranchmenuDto) {
    const { name, icon, branch_id, menu_flag } = createBranchmenuDto;

    try {
      await this.prisma.branchmenu.create({
        data: {
          name,
          icon,
          branch_id,
          menu_flag
        }
      })
      return `Add new branch menu successfully !`;
    }
    catch (error) {
      console.error('Error creating branch menu:', error);
      return 'error: can not add branch menu, please contact to administrator !';
    }
  }

  findAll() {
    return this.prisma.branchmenu.findMany();
  }

  findOne(id: number) {
    return this.prisma.branchmenu.findFirst({ where: { id } });
  }

  async update(id: number, updateBranchmenuDto: UpdateBranchmenuDto) {
    const { name, icon, branch_id, menu_flag } = updateBranchmenuDto
    try {
      const updateData: any = {};
      if (name !== '') { updateData.name = name; }
      if (icon !== '') { updateData.icon = icon; }
      if (branch_id !== 0) { updateData.branch_id = branch_id; }
      if (menu_flag > 0 && menu_flag < 4) { updateData.menu_flag = menu_flag; }

      await this.prisma.branchmenu.update({
        where: { id },
        data: {
          ...updateData,
        }
      });
      return `Update branch menu successfully !`;
    }
    catch (error) {
      console.error('Error updating branch menu:', error);
      return 'error: can not update branch menu, please contact to administrator !';
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.branchmenu.delete({
        where: { id }
      });
      return `Delete branch menu successfully !`;
    }
    catch (error) {
      console.error('Error deleting branch menu :', error);
      return 'error: can not delete branch menu, please contact to administrator !';
    }
  }
}
