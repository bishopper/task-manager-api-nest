import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

enum Status {
  InProccess,
  Completed,
  Incompleted,
}

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  status: Status;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
