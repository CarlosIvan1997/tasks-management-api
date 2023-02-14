import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DynamoDBService } from './dynamodb.service';

const documentClientInstance = {
  scan: jest.fn().mockReturnThis(),
  get: jest.fn().mockReturnThis(),
  put: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  promise: jest.fn(),
};

jest.mock('aws-sdk', () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => documentClientInstance),
    },
  };
});

describe('DynamoDBService', () => {
  let dynamoDBService: DynamoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamoDBService],
    }).compile();

    dynamoDBService = module.get<DynamoDBService>(DynamoDBService);
  });

  it('dynamoDBService should be defined', () => {
    expect(dynamoDBService).toBeDefined();
  });

  it('scan should throw InternalServerErrorException', async () => {
    documentClientInstance.promise.mockRejectedValueOnce(
      new InternalServerErrorException(),
    );

    try {
      await dynamoDBService.scan({ TableName: 'TableName' });
    } catch (error) {
      expect(error).toStrictEqual(new InternalServerErrorException());
    }
  });

  it('scan should return result', async () => {
    documentClientInstance.promise.mockResolvedValueOnce({
      Items: [{ id: 'id' }],
    });

    const result = await dynamoDBService.scan({ TableName: 'TableName' });
    expect(result).toStrictEqual({
      Items: [{ id: 'id' }],
    });
  });

  it('get should throw InternalServerErrorException', async () => {
    documentClientInstance.promise.mockRejectedValueOnce(
      new InternalServerErrorException(),
    );

    try {
      await dynamoDBService.get({ TableName: 'TableName', Key: { id: 'id' } });
    } catch (error) {
      expect(error).toStrictEqual(new InternalServerErrorException());
    }
  });

  it('get should return result', async () => {
    documentClientInstance.promise.mockResolvedValueOnce({
      Item: { id: 'id' },
    });

    const result = await dynamoDBService.get({
      TableName: 'TableName',
      Key: { id: 'id' },
    });
    expect(result).toStrictEqual({
      Item: { id: 'id' },
    });
  });

  it('put should throw InternalServerErrorException', async () => {
    documentClientInstance.promise.mockRejectedValueOnce(
      new InternalServerErrorException(),
    );

    try {
      await dynamoDBService.put({ TableName: 'TableName', Item: {} });
    } catch (error) {
      expect(error).toStrictEqual(new InternalServerErrorException());
    }
  });

  it('put should return result', async () => {
    documentClientInstance.promise.mockResolvedValueOnce({});

    const result = await dynamoDBService.put({
      TableName: 'TableName',
      Item: {},
    });
    expect(result).toStrictEqual({});
  });

  it('update should throw InternalServerErrorException', async () => {
    documentClientInstance.promise.mockRejectedValueOnce(
      new InternalServerErrorException(),
    );

    try {
      await dynamoDBService.update({
        TableName: 'TableName',
        Key: { id: 'id' },
      });
    } catch (error) {
      expect(error).toStrictEqual(new InternalServerErrorException());
    }
  });

  it('update should return result', async () => {
    documentClientInstance.promise.mockResolvedValueOnce({});

    const result = await dynamoDBService.update({
      TableName: 'TableName',
      Key: { id: 'id' },
    });
    expect(result).toStrictEqual({});
  });
});
