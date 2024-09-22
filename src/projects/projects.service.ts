import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private usersRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = this.usersRepository.create(createProjectDto);
    return this.usersRepository.save(newProject);
  }

  findAll() {
    return this.usersRepository.find({
      relations: ['tasks'],
    });
  }

  findOne(id: number): Promise<Project | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    await this.usersRepository.update(id, updateProjectDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
