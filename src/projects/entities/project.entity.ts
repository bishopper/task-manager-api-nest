import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Status {
  InProccess,
  completed,
  incompleted,
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
}
