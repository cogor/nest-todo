import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-task-dto';
import { GetTasksFilterDto } from './DTO/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }
  async getAllTasks(): Promise<Task[]> {
    const found = await this.taskRepository.find();
    if (!found) {
      throw new NotFoundException(`Tasks not found`);
    }
    return found;
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const found = await this.taskRepository.find({
      where: [{ status: status }, { status: status }],
    });
    if (!found) {
      throw new NotFoundException(`Tasks not found`);
    }
    return found;
  }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(task => {
  //       return task.title.includes(search) || task.description.includes(search);
  //     });
  //   }
  //   return tasks;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  // deleteTaskById(id: string): string {
  //   const found = this.getTaskById(id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID ${id} not found`)
  //   }
  //   return 'Deleted';
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
