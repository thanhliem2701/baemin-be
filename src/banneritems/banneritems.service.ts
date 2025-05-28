import { Injectable } from '@nestjs/common';
import { CreateBanneritemDto } from './dto/create-banneritem.dto';
import { UpdateBanneritemDto } from './dto/update-banneritem.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationService } from '../common/validation/validation.service';
import { messages } from 'src/constants/messages';

@Injectable()
export class BanneritemsService {
  constructor(
    public prisma: PrismaService,
    private readonly validationService: ValidationService
  ) {}
  
  async create(createBanneritemDto: CreateBanneritemDto) {
    const  { name ,imgsrc, url } = createBanneritemDto

    //require validate
    this.validationService.validateRequired(name, messages.BANNER_NAME_NULL);
    this.validationService.validateRequired(imgsrc, messages.IMGSRC_NULL_MSG);
    this.validationService.validateRequired(url, messages.BANNER_URL_NULL);
    try {
      await this.prisma.banneritems.create({
        data: {
          name,
          imgsrc,
          url,
        }
      })
      return messages.ADD_BANNER_SUCCESSFUL;
    }
    catch (error) {
      return messages.ADD_BANNER_FAIL;
    }
  }

  findAll() {
    return this.prisma.banneritems.findMany();
  }

  findOne(id: number) {
    //validate null
    const validId = this.validationService.validateId(id, messages.BANNER_ID_NULL);

    return this.prisma.banneritems.findFirst({ where: { id: validId } });;
  }

  async update(id: number, updateBanneritemDto: UpdateBanneritemDto) {
    //validate null
    const validId = this.validationService.validateId(id, messages.BANNER_ID_NULL);

    const { name, imgsrc, url } = updateBanneritemDto
    try {
      const updateData: any = {};
      if (name !== '') { updateData.name = name; }
      if (imgsrc !== '') { updateData.imgsrc = imgsrc; }
      if (url !== '') { updateData.description = url; }

      await this.prisma.banneritems.update({
        where: { id: validId },
        data: {
          ...updateData,
        }
      });
      return messages.UPD_BANNER_SUCCESSFUL;
    }
    catch (error) {
      return messages.UPD_BANNER_FAIL;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.banneritems.delete({
        where: { id }
      });
      return messages.DEL_BANNER_SUCCESSFUL;
    }
    catch (error) {
      return messages.DEL_BANNER_FAIL;
    }
  }
}
