import { Injectable, Logger } from '@nestjs/common';
import { EmailInput } from '../../dtos/inputs/email/email.input';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(input: EmailInput): Promise<{ success: boolean, message: string}> {
    const mailOptions: ISendMailOptions = {
      to: input.to.join(','),
      subject: input.subject,
      html: input.html,
    };
    try {
      const result = await this.mailerService.sendMail(mailOptions);
      return {
        success: !!result,
        message: !!result ? 'OK' : 'Error sending emails',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message ?? 'Error sending emails',
      };
    }
  }
}
