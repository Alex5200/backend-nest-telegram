import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ivan', description: 'Имя пользователя' })
  @Column()
  username: string;

  @ApiProperty({
    example: '+79991234567',
    description: 'Телефон',
    required: false,
  })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    example: 'ivan@mail.com',
    description: 'Почта',
    required: false,
  })
  @Column({ nullable: true })
  mail: string;

  @ApiProperty({
    example: 'Описание пользователя',
    description: 'Описание',
    required: false,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Фото',
    required: false,
  })
  @Column({ type: 'blob', nullable: true })
  photo: string; // теперь это путь к файлу, а не Buffer
}
