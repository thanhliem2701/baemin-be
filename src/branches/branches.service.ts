import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationService } from '../common/validation/validation.service';
import { messages } from 'src/constants/messages';

@Injectable()
export class BranchesService {
  constructor(
    public prisma: PrismaService,
    private readonly validationService: ValidationService,
  ) {}

  async create(createBranchDto: CreateBranchDto) {
    const {name,address, img, tradinghour, pricerange, total_rating,number_of_rating,company_id} = createBranchDto;

    //validate id
    const valid_companyId = this.validationService.validateId(company_id, messages.COMPANYID_NULL);

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
          company_id: valid_companyId
        }
      })
      return messages.ADD_BRANCH_SUCCESSFUL;
    }
    catch (error) {
      return messages.ADD_BRANCH_FAIL;
    }
  }

  findAll() {
    return this.prisma.branches.findMany();
  }

  findOne(id: number) {
    //vailidate id
    const validId = this.validationService.validateId(id, messages.BRANCHID_NULL);
    return this.prisma.branches.findFirst({ where: { id: validId } });
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
      return messages.UPD_BRANCH_SUCCESSFUL;
    }
    catch (error) {
      return messages.UPD_BRANCH_FAIL;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.branches.delete({
        where: { id }
      });
      return messages.DEL_BRANCH_SUCCESSFUL;
    }
    catch (error) {
      return messages.DEL_BRANCH_FAIL;
    }
  }
}
