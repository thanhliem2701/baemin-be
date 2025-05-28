import { Injectable } from '@nestjs/common';
import { CreateBranchmenuDto } from './dto/create-branchmenu.dto';
import { UpdateBranchmenuDto } from './dto/update-branchmenu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationService } from '../common/validation/validation.service';
import { messages } from 'src/constants/messages';

@Injectable()
export class BranchmenuService {
  constructor(
    public prisma: PrismaService,
    private readonly validationService: ValidationService,
  ) {}

  async create(createBranchmenuDto: CreateBranchmenuDto) {
    const { name, icon, branch_id, menu_flag } = createBranchmenuDto;

    //validate branch_id
    const validId = this.validationService.validateId(branch_id, messages.BRANCHID_NULL);
    this.validationService.validateRequired(name, messages.BRANCH_MENU_NAME_NULL);
    try {
      await this.prisma.branchmenu.create({
        data: {
          name,
          icon,
          branch_id: validId,
          menu_flag
        }
      })
      return messages.ADD_BRANCH_MENU_SUCCESSFUL;
    }
    catch (error) {
      return messages.ADD_BRANCH_MENU_FAIL;
    }
  }

  findAll() {
    return this.prisma.branchmenu.findMany();
  }

  findOne(id: number) {
    //validate id
    const validId = this.validationService.validateId(id, messages.MENU_ID_NULL);

    return this.prisma.branchmenu.findFirst({ where: { id: validId } });
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
      return messages.UPD_BRANCH_MENU_SUCCESSFUL;
    }
    catch (error) {
      return messages.UPD_BRANCH_MENU_FAIL;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.branchmenu.delete({
        where: { id }
      });
      return messages.DEL_BRANCH_MENU_SUCCESSFUL;
    }
    catch (error) {
      return messages.DEL_BRANCH_MENU_FAIL;
    }
  }
}
