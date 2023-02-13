import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  private dynamoDBClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDBClient = process.env.IS_OFFLINE
      ? new AWS.DynamoDB.DocumentClient({
          region: 'localhost',
          endpoint: process.env.DYNAMODB_ENDPOINT,
        })
      : new AWS.DynamoDB.DocumentClient();
  }

  async scan(
    input: AWS.DynamoDB.DocumentClient.ScanInput,
  ): Promise<Record<string, unknown>> {
    try {
      return (await this.dynamoDBClient
        .scan(input)
        .promise()) as unknown as Record<string, unknown>;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async get(
    input: AWS.DynamoDB.DocumentClient.GetItemInput,
  ): Promise<Record<string, unknown>> {
    try {
      return (await this.dynamoDBClient
        .get(input)
        .promise()) as unknown as Record<string, unknown>;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async put(
    input: AWS.DynamoDB.DocumentClient.PutItemInput,
  ): Promise<Record<string, unknown>> {
    try {
      return (await this.dynamoDBClient
        .put(input)
        .promise()) as unknown as Record<string, unknown>;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    input: AWS.DynamoDB.DocumentClient.UpdateItemInput,
  ): Promise<Record<string, unknown>> {
    try {
      return (await this.dynamoDBClient
        .update(input)
        .promise()) as unknown as Record<string, unknown>;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
