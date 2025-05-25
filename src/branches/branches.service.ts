import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BranchesService {
  prisma = new PrismaClient();

  async create(createBranchDto: CreateBranchDto) {
    const {name,address, img, tradinghour, pricerange, total_rating,number_of_rating,company_id} = createBranchDto;

    try {
      await this.prisma.branches.create({
        data: {
          name,
          address,
          img,
          tradinghour,
          pricerange,
          total_rating,
          number_of_rating,
          company_id
        }
      })
      return `Add new branch successfully !`;
    }
    catch (error) {
      console.error('Error creating branch:', error);
      return 'error: can not add branch, please contact to administrator !';
    }
  }

  findAll() {
    return this.prisma.branches.findMany();
  }

  findOne(id: number) {
    return this.prisma.branches.findFirst({ where: { id } });
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const { name,address, img, tradinghour, pricerange, total_rating,number_of_rating,company_id } = updateBranchDto
    try {
      const updateData: any = {};
      if (name !== '') { updateData.name = name; }
      if (img !== '') { updateData.img = img; }
      if (address !== '') { updateData.address = address; }
      if (tradinghour !== '') { updateData.tradinghour = tradinghour; }
      if (pricerange !== '') { updateData.pricerange = pricerange; }
      if (total_rating !== 0) { updateData.total_rating = total_rating; }
      if (number_of_rating !== 0) { updateData.number_of_rating = number_of_rating; }
      if (company_id !== 0) { updateData.company_id = company_id; }

      await this.prisma.branches.update({
        where: { id },
        data: {
          ...updateData,
        }
      });
      return `Update branch successfully !`;
    }
    catch (error) {
      console.error('Error updating branch:', error);
      return 'error: can not update branch, please contact to administrator !';
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.branches.delete({
        where: { id }
      });
      return `Delete branch successfully !`;
    }
    catch (error) {
      console.error('Error deleting branch:', error);
      return 'error: can not delete branch, please contact to administrator !';
    }
  }
}
