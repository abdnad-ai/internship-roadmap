import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger('EmailService');
  private transporter: nodemailer.Transporter | null = null;

  constructor(private config: ConfigService) {
    const host = this.config.get<string>('EMAIL_HOST');
    const user = this.config.get<string>('EMAIL_USER');
    const pass = this.config.get<string>('EMAIL_PASS');

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port: Number(this.config.get<string>('EMAIL_PORT') ?? '587'),
        secure: false,
        auth: { user, pass },
      });
    } else {
      this.logger.warn(
        'Email credentials not configured - emails will be logged instead of sent',
      );
    }
  }

  async sendNotification(to: string, subject: string, message: string) {
    if (!this.transporter) {
      this.logger.log(
        `[Email skipped - no config] To: ${to} | ${subject} | ${message}`,
      );
      return;
    }
    try {
      await this.transporter.sendMail({
        from:
          this.config.get<string>('EMAIL_FROM') ??
          'no-reply@website-monitor.app',
        to,
        subject,
        text: message,
      });
    } catch (error) {
      this.logger.error('Failed to send email notification', error);
    }
  }
}
