import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const project = await this.projectsRepository.findOneBy({
      id: createTaskDto.projectId,
    });
    if (!project) {
      throw new Error('Project not found');
    }

    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      project,
    });

    return this.tasksRepository.save(newTask);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (!task) {
      throw new Error('Task not found');
    }

    if (updateTaskDto.projectId) {
      const project = await this.projectsRepository.findOneBy({
        id: updateTaskDto.projectId,
      });
      if (!project) {
        throw new Error('Project not found');
      }
      task.project = project;
    }

    Object.assign(task, updateTaskDto);
    await this.tasksRepository.save(task);

    return task;
  }

  findAll() {
    return this.tasksRepository.find();
  }

  findOne(id: number) {
    return this.tasksRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
