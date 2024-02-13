const jwt = require('jsonwebtoken');
const app = require('../index');
const request = require('supertest');
const Task = require('../Models/taskModel');
const User = require('../Models/userModel');


beforeEach(async () => {
  await Task.deleteMany({});
});

beforeEach(async () => {
  await User.deleteMany({});
});


describe('Task Controller Tests - CRUD Operations', () => {
  let token;
  let task_id;
  let userId;

  beforeAll(async () => {
    const signUp = await request(app).post('/signUp').send({ email: 'user@gmail.com', password: 'userpassword' });
    expect(signUp.status).toBe(201);

    const signIn = await request(app).post('/signIn').send({ email: 'user@gmail.com', password: 'userpassword' });

    expect(signIn.status).toBe(200);
    token = signIn.body.token;
    const decodedNewToken = jwt.decode(token);
    console.log('Decoded new token: in task.test.js file' , decodedNewToken);
    userId = decodedNewToken.userId;
  });

  const createTask = async (title, description, status) => {
    const response = await request(app).post('/api/task/create').set('Authorization', `Bearer ${token}`).send({ title, description, status });
    expect(response.status).toBe(201);
    console.log(response);
    task_id = response.body._id;

  };

  const retrieveTaskById = async () => {
    const retrievedTask = await request(app).get(`/api/task/get/${task_id}`).set('Authorization', `Bearer ${token}`);
    expect(retrievedTask.status).toBe(200);
  };


  const updateTask = async (updatedTitle, updatedDescription, updatedStatus) => {
    const response = await request(app).put(`/api/task/update/${task_id}`).set('Authorization', `Bearer ${token}`).send({ title: updatedTitle, description: updatedDescription, status: updatedStatus});
    expect(response.status).toBe(200);
  };

  const deleteTask = async () => {
    const response = await request(app).delete(`/api/task/del/${task_id}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  };

  const retrieveAllTasks = async () => {
    const response = await request(app).get(`/api/task/getAll`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  };

  describe('Executing the Tests', () => {

    test('should create a new task', async () => {
      await createTask('My Task', 'This is my task', 'pending');
    });

    test('should retrieve a task by its ID', async () => {
      await createTask('My Task', 'This is my task');
      await retrieveTaskById();
    });

    test('should update a task', async () => {
      await createTask('Task to Update', 'This is a task to update');
      await updateTask('Updated Task', 'This task has been updated');
    });

    test('should delete a task', async () => {
      await createTask('Task to Delete', 'This is a task to delete');
      await deleteTask();
    });

    test('should retrieve all tasks', async () => {
      await createTask('My Task', 'This is my task');
      await retrieveAllTasks();
    });


  });


});
