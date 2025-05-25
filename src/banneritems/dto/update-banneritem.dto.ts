import { PartialType } from '@nestjs/mapped-types';
import { CreateBanneritemDto } from './create-banneritem.dto';

export class UpdateBanneritemDto extends PartialType(CreateBanneritemDto) {
    id: number
    name: string
    imgsrc: string
    url:string
}
