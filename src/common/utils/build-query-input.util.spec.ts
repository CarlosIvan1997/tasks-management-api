import { buildQueryInput } from './build-query-input.util';

const body = {
  name: 'Name',
  description: 'Description',
  isCompleted: false,
};

const result = {
  expressionAttributeNames: {
    '#description': 'description',
    '#isCompleted': 'isCompleted',
    '#name': 'name',
  },
  expressionAttributeValues: {
    ':description': 'Description',
    ':isCompleted': false,
    ':name': 'Name',
  },
  expression:
    '#name = :name, #description = :description, #isCompleted = :isCompleted',
};

describe('buildQueryInput', () => {
  it('should build query input', () => {
    const input = buildQueryInput(body);

    expect(input).toStrictEqual(result);
  });
});
