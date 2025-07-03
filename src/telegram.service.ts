import { Injectable } from '@nestjs/common';
import * as axios from 'axios';

@Injectable()
export class TelegramService {
  private readonly botToken = '7480705468:AAEr92MYWNLJcVTIeR8DN2Nd1HMXRP2dsRc'; // Замените на свой токен
  private readonly chatId = '710786655'; // Замените на свой chat_id

  async sendMessage(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    await axios.default.post(url, {
      chat_id: this.chatId,
      text: message,
      parse_mode: 'HTML',
    });
  }
} 