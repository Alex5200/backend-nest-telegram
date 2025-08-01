import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWorkUserDto {
  @ApiProperty({ 
    description: 'Current project stage', 
    example: 'In Progress',
    required: false
  })
  @IsString()
  @IsOptional()
  projectStage?: string;

  @ApiProperty({ 
    description: 'Additional comments', 
    example: 'Waiting for client feedback',
    required: false
  })
  @IsString()
  @IsOptional()
  comments?: string;

  @ApiProperty({ 
    description: 'URL or path to the user photo', 
    example: 'uploads/photos/user123.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  photo?: string;
}
