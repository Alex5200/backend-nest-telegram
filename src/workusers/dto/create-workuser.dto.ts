import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkUserDto {
  @ApiProperty({ description: 'User first name', example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Project stage', example: 'Initial' })
  @IsString()
  @IsNotEmpty()
  projectStage: string;

  @ApiProperty({ description: 'User phone number', example: '+1234567890' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ description: 'Additional comments', example: 'VIP client' })
  @IsString()
  @IsOptional()
  comments?: string;

  @ApiPropertyOptional({ description: 'URL to user photo', example: 'http://example.com/photo.jpg' })
  @IsString()
  @IsOptional()
  photo?: string;
}