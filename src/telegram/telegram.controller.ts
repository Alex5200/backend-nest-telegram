import { Controller, Get, Query } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('Telegram')
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @ApiOperation({ summary: 'Отправить сообщение в Telegram' })
  @ApiQuery({ name: 'msg', required: false, description: 'Текст сообщения' })
  @ApiResponse({ status: 200, description: 'Сообщение отправлено', schema: { example: { status: 'ok' } } })
  @Get('send')
  async send(@Query('msg') msg: string) {
    await this.telegramService.sendMessage(msg || 'Тестовое сообщение!');
    return { status: 'ok' };
  }

  @ApiOperation({ summary: 'Вывести chat_id из Telegram (в логи)' })
  @ApiResponse({ status: 200, description: 'chat_id выведен в логи', schema: { example: { status: 'check logs' } } })
  @Get('id')
  async getId() {
    await this.telegramService.printChatId();
    return { status: 'check logs' };
  }
}
