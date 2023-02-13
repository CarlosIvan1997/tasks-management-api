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

  async scan(input: AWS.DynamoDB.DocumentClient.ScanInput) {
    try {
      return await this.dynamoDBClient.scan(input).promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async get(input: AWS.DynamoDB.DocumentClient.GetItemInput) {
    try {
      return await this.dynamoDBClient.get(input).promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async put(input: AWS.DynamoDB.DocumentClient.PutItemInput) {
    try {
      return await this.dynamoDBClient.put(input).promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(input: AWS.DynamoDB.DocumentClient.UpdateItemInput) {
    try {
      return await this.dynamoDBClient.update(input).promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
