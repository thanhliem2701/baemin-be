import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationService } from '../common/validation/validation.service';
import { messages } from 'src/constants/messages';

@Injectable()
export class MenuService {
  constructor(
    public prisma: PrismaService,
    private readonly validationService: ValidationService,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const { name, imgsrc, description } = createMenuDto;

    //validate name
    this.validationService.validateRequired(name, messages.MENU_NAME_NULL);
    try {
      await this.prisma.menu.create({
        data: {
          name,
          imgsrc,
          description,
        }
      })
      return messages.ADD_BRANCH_MENU_SUCCESSFUL;
    }
    catch (error) {
      return messages.ADD_BRANCH_MENU_FAIL;
    }
  }

  findAll() {
    return this.prisma.menu.findMany();
  }

  findOne(id: number) {
    //validate id
    const validId = this.validationService.validateId(id, messages.MENU_ID_NULL);
    return this.prisma.menu.findFirst({ where: { id: validId } });;
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
      return messages.UPD_BRANCH_MENU_SUCCESSFUL;
    }
    catch (error) {
      return messages.UPD_BRANCH_MENU_FAIL;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.menu.delete({
        where: { id }
      });
      return messages.DEL_BRANCH_MENU_SUCCESSFUL;
    }
    catch (error) {
      return messages.DEL_BRANCH_MENU_FAIL;
    }
  }
}
