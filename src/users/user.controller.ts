import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads', // папка для сохранения фото
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'Ivan' },
        phone: { type: 'string', example: '+79991234567' },
        mail: { type: 'string', example: 'ivan@mail.com' },
        description: { type: 'string', example: 'Описание' },
        photo: { type: 'string', format: 'binary' },
      },
    },
  })
  async uploadUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    // file.path — путь к сохранённому файлу
    return this.userService.create({
      ...body,
      photo: file?.path, // сохраняем путь к файлу
    });
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
