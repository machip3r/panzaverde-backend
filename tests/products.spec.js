const app = require("./../src/app");
const request = require('supertest');

describe('GET /products', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/products').send();
    expect(response.statusCode).toBe(200);
  });
});

