import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationService {

    //check id null or incorrect format
    validateId(id: any, erorMessage: string) {

        if (!id || isNaN(+id) || +id <= 0) {
            throw new BadRequestException(erorMessage);
        }
        return +id;
    }

    //check item required
    validateRequired(value: any, erorMessage: string) {

        if (value === undefined || value === null || value === '') {
            throw new BadRequestException(erorMessage);
        }
    }

    //check item price
    validatePrice(value: number, erorMessage: string) {

        if (!value || value <= 0) {
            throw new BadRequestException(erorMessage);
        }
    }

    //check item length
    validateLength(value: string, erorMessage: string, min: number, max: number) {
        if (!value || value.length < min || value.length > max) {
            throw new BadRequestException(erorMessage);
        }
    }
}