import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branch.dto';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
    id: number
    name: string
    address: string
    img: string
    tradinghour: string
    pricerange: string
    total_rating: number
    number_of_rating: number
    company_id: number
}
