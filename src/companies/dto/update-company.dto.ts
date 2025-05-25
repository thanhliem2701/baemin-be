import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    id: number;
    name: string;
    img: string;
    tel: string;
    address: string;
    commission: number;
    tag: string;
}
