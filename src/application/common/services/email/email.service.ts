import { Injectable, Logger } from '@nestjs/common';
import { EmailInput } from '../../dtos/inputs/email/email.input';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(input: EmailInput): Promise<void> {
    const mailOptions = {
      to: input.to.join(','),
      subject: input.subject,
      html: input.html,
    };
    this.mailerService.sendMail(mailOptions).then(() => {
      Logger.debug('success');
    })
      .catch((e) => {
        Logger.debug(e);
      });
  }
}
