import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegramService {
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN || '';
  private readonly chatId = process.env.TELEGRAM_CHAT_ID || '';
  private readonly logger = new Logger(TelegramService.name);

  async sendMessage(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    await axios.post(url, {
      chat_id: this.chatId,
      text: message,
      parse_mode: 'HTML',
    });
  }

  async printChatId(): Promise<void> {
    const url = `https://api.telegram.org/bot${this.botToken}/getUpdates`;
    const response = await axios.get(url);
    const updates = response.data.result;
    if (updates && updates.length > 0) {
      const chatId = updates[0].message?.chat?.id;
      if (chatId) {
        this.logger.log(`Ваш chat_id: ${chatId}`);
      } else {
        this.logger.warn('chat_id не найден. Напишите сообщение вашему боту в Telegram.');
      }
    } else {
      this.logger.warn('Нет новых сообщений. Напишите сообщение вашему боту в Telegram.');
    }
  }
}