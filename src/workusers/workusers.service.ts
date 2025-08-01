import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkUser } from './entities/workuser.entity';
import { CreateWorkUserDto } from './dto/create-workuser.dto';
import { UpdateWorkUserDto } from './dto/update-workuser.dto';

@Injectable()
export class WorkusersService {
  constructor(
    @InjectRepository(WorkUser)
    private readonly workUserRepository: Repository<WorkUser>,
  ) {}

  async create(createWorkUserDto: CreateWorkUserDto): Promise<WorkUser> {
    const { email } = createWorkUserDto;

    // Check if email already exists
    // Проверяем, существует ли пользователь с таким email
    const emailExists = await this.workUserRepository.findOne({
      where: { email }, // современный синтаксис TypeORM v0.3+
    });
    if (emailExists) {
      throw new ConflictException('Email already in use');
    }

    // Check if phone number already exists
    const phoneExists = await this.workUserRepository.findOne({
      where: { phoneNumber: createWorkUserDto.phoneNumber },
    });

    if (phoneExists) {
      throw new ConflictException('Phone number already in use');
    }

    const workUser = this.workUserRepository.create(createWorkUserDto);
    return this.workUserRepository.save(workUser);
  }

  async findAll(): Promise<WorkUser[]> {
    return this.workUserRepository.find();
  }

  async findByProjectStage(projectStage: string): Promise<WorkUser[]> {
    return this.workUserRepository.find({
      where: { projectStage },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<WorkUser> {
    const workUser = await this.workUserRepository.findOne({ where: { id } });
    if (!workUser) {
      throw new NotFoundException(`WorkUser with ID ${id} not found`);
    }
    return workUser;
  }

  async update(id: string, updateWorkUserDto: UpdateWorkUserDto): Promise<WorkUser> {
    const workUser = await this.findOne(id);
    
    // Check if new email already exists
    if (updateWorkUserDto.email && updateWorkUserDto.email !== workUser.email) {
      const emailExists = await this.workUserRepository.findOne({ 
        where: { email: updateWorkUserDto.email } 
      });
      
      if (emailExists) {
        throw new ConflictException('Email already in use');
      }
    }

    // Check if new phone number already exists
    if (updateWorkUserDto.phoneNumber && updateWorkUserDto.phoneNumber !== workUser.phoneNumber) {
      const phoneExists = await this.workUserRepository.findOne({ 
        where: { phoneNumber: updateWorkUserDto.phoneNumber } 
      });
      
      if (phoneExists) {
        throw new ConflictException('Phone number already in use');
      }
    }

    Object.assign(workUser, updateWorkUserDto);
    return this.workUserRepository.save(workUser);
  }

  async remove(id: string): Promise<void> {
    const result = await this.workUserRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`WorkUser with ID ${id} not found`);
    }
  }
}