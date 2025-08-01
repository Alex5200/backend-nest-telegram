import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { User } from './users/user.entity';
import { TelegramModule } from './telegram/telegram.module';
import { WorkusersModule } from './workusers/workusers.module';
import { WorkUser } from './workusers/entities/workuser.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ticket.db',
      entities: [User, WorkUser],
      synchronize: true,
    }),
    UserModule,
    TelegramModule,
    WorkusersModule,
  ],
})
export class AppModule {}