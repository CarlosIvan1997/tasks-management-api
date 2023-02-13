export const buildQueryInput = (body: Record<string, unknown>) => {
  let expression = '';
  let expressionAttributeNames = {};
  let expressionAttributeValues = {};

  Object.keys(body).forEach((key) => {
    expression = `${expression} #${key} = :${key},`;

    expressionAttributeNames = {
      ...expressionAttributeNames,
      [`#${key}`]: `${key}`,
    };

    expressionAttributeValues = {
      ...expressionAttributeValues,
      [`:${key}`]: body[key],
    };
  });

  expression = expression.trim().slice(0, -1);

  return {
    expression,
    expressionAttributeNames,
    expressionAttributeValues,
  };
};
