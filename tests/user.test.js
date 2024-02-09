const request = require('supertest');
const app = require('../index'); 

const User = require('../Models/userModel');

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Sign In and SignUp functions', () => {
  test('Sign Up function', async () => {
    const response = await request(app).post('/signUp').send({ email: 'testuser@gmail.com', password: 'testpassword' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('email', 'testuser@gmail.com');
    
  });

  test('Signing Up with already existing email', async () => {

    await request(app).post('/signUp').send({ email: 'testuser@gmail.com', password: 'testpassword' });
    const response = await request(app).post('/signUp').send({ email: 'testuser@gmail.com', password: 'testpassword' });

    expect(response.status).toBe(400);
    
    
  });

  test('Sign In Function', async () => {
    
      await request(app).post('/signUp').send({ email: 'testuser@gmail.com', password: 'testpassword' });

    const response = await request(app).post('/signIn').send({ email: 'testuser@gmail.com', password: 'testpassword' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Sign In Function with Invalid Credentials', async () => {
    
    await request(app).post('/signUp').send({ email: 'testuser@gmail.com', password: 'testpassword' });

  const response = await request(app).post('/signIn').send({ email: 'testuser@gmail.com', password: 'testpass' });

  expect(response.status).toBe(401);
  
});

  
});
