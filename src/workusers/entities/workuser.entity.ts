import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('work_users')
export class WorkUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ name: 'project_stage', nullable: false })
  projectStage: string;

  @Column({ name: 'phone_number', nullable: false, unique: true })
  phoneNumber: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
