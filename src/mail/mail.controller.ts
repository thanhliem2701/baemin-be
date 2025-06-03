import { Controller, Body, Post, BadRequestException } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('sendmail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post()
    async sendMail(@Body() body: any) {
        const { to, subject, orderSummary } = body;
        if (!to || !subject || !orderSummary) {
            throw new BadRequestException('missing param!');
        }
        await this.mailService.sendOrderConfirmation(to, subject, orderSummary);
        return { message: 'Email sent successfully' };
    }
}