import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DynamoDBModule } from '../common/modules/dynamodb/dynamodb.module';
import { Task } from './entities/task.entity';

const mockedTask: Task = {
  id: 'id',
  name: 'name',
  description: 'description',
  isCompleted: false,
  isDeleted: false,
};

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DynamoDBModule],
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksController = app.get<TasksController>(TasksController);
    tasksService = app.get<TasksService>(TasksService);

    jest.clearAllMocks();
  });

  it('findAll should retrieve tasks', async () => {
    jest.spyOn(tasksService, 'findAll').mockResolvedValue([mockedTask]);

    const tasks = await tasksController.findAll();
    expect(tasks).toStrictEqual([mockedTask]);
  });

  it('findOne should retrieve task', async () => {
    jest.spyOn(tasksService, 'findOne').mockResolvedValue(mockedTask);

    const task = await tasksController.findOne('id');
    expect(task).toStrictEqual(mockedTask);
  });

  it('create should return created task', async () => {
    jest.spyOn(tasksService, 'create').mockResolvedValue(mockedTask);

    const task = await tasksController.create({
      name: 'name',
      description: 'description',
    });
    expect(task).toStrictEqual(mockedTask);
  });

  it('update should return updated task', async () => {
    jest.spyOn(tasksService, 'update').mockResolvedValue(mockedTask);

    const task = await tasksController.update('id', {
      name: 'name',
    });
    expect(task).toStrictEqual(mockedTask);
  });

  it('remove should return result message', async () => {
    jest
      .spyOn(tasksService, 'remove')
      .mockResolvedValue({ message: 'message' });

    const result = await tasksController.remove('id');
    expect(result).toStrictEqual({ message: 'message' });
  });
});
