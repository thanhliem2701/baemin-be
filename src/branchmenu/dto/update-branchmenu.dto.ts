import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchmenuDto } from './create-branchmenu.dto';

export class UpdateBranchmenuDto extends PartialType(CreateBranchmenuDto) {
    id: number
    name: string
    icon: string
    branch_id: number
    menu_flag: number
}
