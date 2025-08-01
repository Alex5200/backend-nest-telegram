import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkusersController } from './workusers.controller';
import { WorkusersService } from './workusers.service';
import { WorkUser } from './entities/workuser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkUser]),
  ],
  controllers: [WorkusersController],
  providers: [WorkusersService],
  exports: [WorkusersService],
})
export class WorkusersModule {}