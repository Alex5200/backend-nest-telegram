import {
  Controller,
  Get,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Body,
  NotFoundException,
  HttpStatus,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { WorkusersService } from './workusers.service';
import { UpdateWorkUserDto } from './dto/update-workuser.dto';
import { WorkUser } from './entities/workuser.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Work Users')
@Controller('api/work-users')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class WorkusersController {
  constructor(private readonly workusersService: WorkusersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all work users with basic information' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns an array of work users with basic information',
    type: [WorkUser],
  })
  async findAll(): Promise<WorkUser[]> {
    return this.workusersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get work user details by ID' })
  @ApiParam({ name: 'id', description: 'Work user ID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the work user details',
    type: WorkUser,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Work user not found',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<WorkUser> {
    const user = await this.workusersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`WorkUser with ID "${id}" not found`);
    }
    return user;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new work user' })
  @ApiBody({ type: UpdateWorkUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The work user has been successfully created',
    type: WorkUser,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email or phone number already in use',
  })
  async create(@Body() createWorkUserDto: UpdateWorkUserDto): Promise<WorkUser> {
    return this.workusersService.create(createWorkUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update work user information' })
  @ApiParam({ name: 'id', description: 'Work user ID', type: String })
  @ApiBody({ type: UpdateWorkUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The work user has been successfully updated',
    type: WorkUser,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Work user not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email or phone number already in use',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWorkUserDto: UpdateWorkUserDto,
  ): Promise<WorkUser> {
    return this.workusersService.update(id, updateWorkUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a work user' })
  @ApiParam({ name: 'id', description: 'Work user ID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The work user has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Work user not found',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.workusersService.remove(id);
  }
}
