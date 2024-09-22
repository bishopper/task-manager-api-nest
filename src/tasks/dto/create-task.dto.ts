import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  title: string;
  description?: string;
  status: TaskStatus;
  projectId: number;
}
