import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DynamoDBService } from '../common/modules/dynamodb/dynamodb.service';
import { TableName } from './constants';
import { Task } from './entities/task.entity';
import { Response } from '../common/interfaces/response.interface';
import { buildQueryInput } from '../common/utils/build-query-input.util';

@Injectable()
export class TasksService {
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async findAll(): Promise<Array<Task>> {
    const { expression, expressionAttributeNames, expressionAttributeValues } =
      buildQueryInput({ isDeleted: false });

    const { Items: tasks } = (await this.dynamoDBService.scan({
      TableName,
      FilterExpression: expression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    })) as unknown as { Items: Array<Task> };

    return tasks;
  }

  async findOne(id: string): Promise<Task> {
    const { Item: task } = (await this.dynamoDBService.get({
      TableName,
      Key: { id },
    })) as unknown as { Item: Task };

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask: Task = {
      id: uuid(),
      ...createTaskDto,
      isCompleted: false,
      isDeleted: false,
    };

    await this.dynamoDBService.put({
      TableName,
      Item: newTask,
    });

    return newTask;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    let task = await this.findOne(id);

    task = { ...task, ...updateTaskDto };

    const { expression, expressionAttributeNames, expressionAttributeValues } =
      buildQueryInput(updateTaskDto as Record<string, unknown>);

    await this.dynamoDBService.update({
      TableName,
      Key: { id },
      UpdateExpression: `set ${expression}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    });

    return task;
  }

  async remove(id: string): Promise<Response> {
    await this.findOne(id);

    const { expression, expressionAttributeNames, expressionAttributeValues } =
      buildQueryInput({ isDeleted: true });

    await this.dynamoDBService.update({
      TableName,
      Key: { id },
      UpdateExpression: `set ${expression}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    });

    return { message: `Task with ID "${id}" has been removed` };
  }
}
