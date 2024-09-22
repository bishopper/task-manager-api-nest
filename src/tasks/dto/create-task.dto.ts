import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  title: string;

  @ApiProperty({ description: 'The description of the task', required: false })
  description?: string;

  @ApiProperty({ enum: TaskStatus, description: 'The status of the task' })
  status: TaskStatus;

  @ApiProperty({
    description: 'The ID of the project that the task belongs to',
  })
  projectId: number;
}
