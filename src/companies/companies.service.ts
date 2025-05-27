import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(public prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const {name, img, tel, address, commission, tag} = createCompanyDto;

    try {
      await this.prisma.companies.create({
        data: {
          name,
          img,
          tel,
          address,
          commission,
          tag
        }
      })
      return `Add new company successfully !`;
    }
    catch (error) {
      console.error('Error creating company:', error);
      return 'error: can not add company, please contact to administrator !';
    }
  }

  findAll() {
    return this.prisma.companies.findMany();
  }

  findOne(id: number) {
    return this.prisma.companies.findFirst({ where: { id } });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const { name, img, tel, address, commission,tag } = updateCompanyDto
    try {
      const updateData: any = {};
      if (name !== '') { updateData.name = name; }
      if (img !== '') { updateData.img = img; }
      if (tel !== '') { updateData.tel = tel; }
      if (address !== '') { updateData.address = address; }
      if (commission !== 0) { updateData.commission = commission; }
      if (tag !== '') { updateData.tag = tag; }

      await this.prisma.companies.update({
        where: { id },
        data: {
          ...updateData,
        }
      });
      return `Update company successfully !`;
    }
    catch (error) {
      console.error('Error updating company:', error);
      return 'error: can not update company, please contact to administrator !';
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.companies.delete({
        where: { id }
      });
      return `Delete company successfully !`;
    }
    catch (error) {
      console.error('Error deleting company:', error);
      return 'error: can not delete company, please contact to administrator !';
    }
  }
}
