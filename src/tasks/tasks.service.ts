import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  async findAll() {
    return [];
  }

  async findOne(id: string) {
    return id;
  }

  async create(createTaskDto: CreateTaskDto) {
    return createTaskDto;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return { id, updateTaskDto };
  }

  async remove(id: string) {
    return id;
  }
}
