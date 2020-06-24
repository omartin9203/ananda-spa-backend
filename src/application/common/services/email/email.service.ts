import { Injectable, Logger } from '@nestjs/common';
import { EmailInput } from '../../dtos/inputs/email/email.input';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(input: EmailInput): Promise<void> {
    this.mailerService.sendMail(input).then(() => {
      Logger.debug('success');
    })
      .catch((e) => {
        Logger.debug(e);
      });
  }
}
