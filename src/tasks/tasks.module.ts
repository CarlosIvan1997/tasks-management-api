import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DynamoDBModule } from '../common/modules/dynamodb/dynamodb.module';

@Module({
  imports: [DynamoDBModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
