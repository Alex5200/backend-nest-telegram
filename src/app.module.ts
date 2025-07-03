import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { User } from './users/user.entity';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ticket.db',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    TelegramModule
  ],
})
export class AppModule {}