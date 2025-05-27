export class CreateOrderDto {
    user_id: number
    user_name: string
    user_phone: string
    delivery_address: string
    total_price : number
    del_flag : number
    discount_code : string
    discount_amount: number
}
