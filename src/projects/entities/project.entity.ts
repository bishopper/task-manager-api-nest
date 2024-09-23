import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ProjectStatus {
  InProccess = 'InProccess',
  Completed = 'Completed',
  Incompleted = 'Incompleted',
}

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, default: ProjectStatus.Incompleted })
  status: ProjectStatus;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
