import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { DynamoDBModule } from '../common/modules/dynamodb/dynamodb.module';
import { DynamoDBService } from '../common/modules/dynamodb/dynamodb.service';
import { Task } from './entities/task.entity';

const mockedTask: Task = {
  id: 'id',
  name: 'name',
  description: 'description',
  isCompleted: false,
  isDeleted: false,
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let dynamoDBService: DynamoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DynamoDBModule],
      providers: [TasksService],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    dynamoDBService = module.get<DynamoDBService>(DynamoDBService);

    jest.clearAllMocks();
  });

  it('tasksService should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  it('findAll should throw InternalServerErrorException', async () => {
    jest
      .spyOn(dynamoDBService, 'scan')
      .mockRejectedValue(new InternalServerErrorException());

    try {
      await tasksService.findAll();
    } catch (error) {
      expect(error).toStrictEqual(new InternalServerErrorException());
    }
  });

  it('findAll should retrieve tasks', async () => {
    jest
      .spyOn(dynamoDBService, 'scan')
      .mockResolvedValue({ Items: [mockedTask] });

    const tasks = await tasksService.findAll();
    expect(tasks).toStrictEqual([mockedTask]);
  });

  it('findOne should throw NotFoundException', async () => {
    jest.spyOn(dynamoDBService, 'get').mockResolvedValue({});

    try {
      await tasksService.findOne('id');
    } catch (error) {
      expect(error).toStrictEqual(
        new NotFoundException('Task with ID "id" not found'),
      );
    }
  });

  it('findOne should retrieve task', async () => {
    jest.spyOn(dynamoDBService, 'get').mockResolvedValue({ Item: mockedTask });

    const task = await tasksService.findOne('id');
    expect(task).toBe(mockedTask);
  });

  it('create should throw InternalServerErrorException', async () => {
    jest
      .spyOn(dynamoDBService, 'put')
      .mockRejectedValue(new InternalServerErrorException());

    try {
      await tasksService.create({ name: 'name', description: 'description' });
    } catch (error) {
      expect(error).toStrictEqual(new InternalServerErrorException());
    }
  });

  it('create should return created task', async () => {
    jest.spyOn(dynamoDBService, 'put').mockResolvedValue({});

    const task = await tasksService.create({
      name: 'name',
      description: 'description',
    });
    expect(task.id).toBeTruthy();
    expect(task.name).toBe('name');
    expect(task.description).toBe('description');
    expect(task.isCompleted).toBe(false);
    expect(task.isDeleted).toBe(false);
  });

  it('update should throw NotFoundException', async () => {
    jest.spyOn(dynamoDBService, 'get').mockResolvedValue({});

    try {
      await tasksService.update('id', { name: 'name' });
    } catch (error) {
      expect(error).toStrictEqual(
        new NotFoundException('Task with ID "id" not found'),
      );
    }
  });

  it('update should return updated task', async () => {
    jest.spyOn(dynamoDBService, 'get').mockResolvedValue({ Item: mockedTask });
    jest.spyOn(dynamoDBService, 'update').mockResolvedValue({});

    const task = await tasksService.update('id', {
      name: 'new name',
      isCompleted: true,
    });
    expect(task).toStrictEqual({
      id: 'id',
      name: 'new name',
      description: 'description',
      isCompleted: true,
      isDeleted: false,
    });
  });

  it('remove should throw NotFoundException', async () => {
    jest.spyOn(dynamoDBService, 'get').mockResolvedValue({});

    try {
      await tasksService.remove('id');
    } catch (error) {
      expect(error).toStrictEqual(
        new NotFoundException('Task with ID "id" not found'),
      );
    }
  });

  it('remove should return result message', async () => {
    jest.spyOn(dynamoDBService, 'get').mockResolvedValue({ Item: mockedTask });
    jest.spyOn(dynamoDBService, 'update').mockResolvedValue({});

    const result = await tasksService.remove('id');
    expect(result).toStrictEqual({
      message: 'Task with ID "id" has been removed',
    });
  });
});
