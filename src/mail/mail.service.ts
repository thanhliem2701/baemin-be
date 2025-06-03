import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })

    async sendOrderConfirmation(to: string, subject: string, orderSummary: any) {
        const htmlContent = `
      <h3>Thank you for your order, ${orderSummary.userFullName}!</h3>
      <p>Order Summary:</p>
      <ul>
        <li>Total Quantity: ${orderSummary.totalQuantity}</li>
        <li>Total Price: ${orderSummary.totalPrice.toLocaleString()} VND</li>
        <li>Shipping Fee: ${orderSummary.shippingFee.toLocaleString()} VND</li>
        <li>Discount voucher: ${orderSummary.voucherText}  ' -' ${orderSummary.selectedVoucher.toLocaleString()} VND</li>
        <li>Final Total: ${orderSummary.finalTotal.toLocaleString()} VND</li>
        <li>Payment method: Cash on Delivery VND</li>
      </ul>
      <p>We will contact you soon!</p>
    `;

        await this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            html: htmlContent,
        });
    }
}