# Tasks Management API

### Description

This is a Tasks Management API built with [NestJS](https://nestjs.com/), [Serverless Framework](https://www.serverless.com/) and [DynamoDB](https://aws.amazon.com/dynamodb/).

---

### Instructions to deploy

1. Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Set up AWS credentials

```bash
$ aws configure
```

> | Access Key ID   | Secret Access Key   | Default region name | Default output format |
> | --------------- | ------------------- | ------------------- | --------------------- |
> | <ACCESS_KEY_ID> | <SECRET_ACCESS_KEY> | us-east-1           | json                  |

3. Install [Node.js](https://nodejs.org/en/)
4. Install [Serverless Framework](https://www.serverless.com/framework/docs/getting-started)

```bash
$ sudo npm install -g serverless
```

5. Clone [Tasks Management API Project](https://github.com/CarlosIvan1997/tasks-management-api)

```bash
$ git clone https://github.com/CarlosIvan1997/tasks-management-api.git
```

6. Go to Project Folder

```bash
$ cd tasks-management-api
```

7. Install dependencies

```bash
$ npm install
```

8. Install Serverless plugins

```bash
$ serverless plugin install -n serverless-plugin-optimize
$ serverless plugin install -n serverless-dynamodb-local
$ serverless plugin install -n serverless-offline
$ serverless dynamodb install
```

9. Deploy Tasks Management API

```bash
$ npm run build && serverless deploy
```

Once the deployment is completed, you should see the following output:

```bash
✔ Service deployed to stack tasks-management-api-dev

endpoints:
  ANY - https://vfahyfhidh.execute-api.us-east-2.amazonaws.com/dev/{proxy+}
  ANY - https://vfahyfhidh.execute-api.us-east-2.amazonaws.com/dev/
functions:
  app: tasks-management-api-dev-app
```

Now you can go and test the app with [Postman](https://www.postman.com/downloads/)

10. Remove Tasks Management API (once you have finished testing the app)

```bash
$ serverless remove
```

---

### Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

---

### API Documentation

This is a Tasks Management API, a Task is defined as the following:

```ts
class Task {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  isDeleted: boolean;
}
```

---

#### Creating a new Task

Create a new Task given name and description.

**URL** : `/tasks`

**Method** : `POST`

##### Body

> | name        | type     | data type |
> | ----------- | -------- | --------- |
> | name        | required | string    |
> | description | required | string    |

##### Responses

> | http code | response                                                               |
> | --------- | ---------------------------------------------------------------------- |
> | `201`     | `Task`                                                                 |
> | `400`     | `{"statusCode":400,"message":"Error message", "error": "Bad Request"}` |
> | `500`     | `{"message":"Error message"}`                                          |

---

#### Getting Tasks

Get all Tasks.

**URL** : `/tasks`

**Method** : `GET`

##### Responses

> | http code | response                      |
> | --------- | ----------------------------- |
> | `200`     | `[Task]`                      |
> | `500`     | `{"message":"Error message"}` |

---

#### Getting one Task

Get one Task given an ID.

**URL** : `/tasks/:id`

**Method** : `GET`

##### Responses

> | http code | response                                                                      |
> | --------- | ----------------------------------------------------------------------------- |
> | `200`     | `Task`                                                                        |
> | `404`     | `{"statusCode":404,"message":"Task with ID not found", "error": "Not Found"}` |
> | `500`     | `{"message":"Error message"}`                                                 |
