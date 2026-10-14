import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js'; // Import your Express app

describe('Expenses API Endpoints', () => {
  
  it('POST /expenses - should create a new expense', async () => {
    const newExpense = {
      description: 'Vitest Test Expense',
      amount: 25.50
    };

    const response = await request(app)
      .post('/expenses')
      .send(newExpense)
      .expect('Content-Type', /json/)
      .expect(201); // Expect a 201 Created status code

    // Verify the database returned the inserted data properly
    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toBe('Vitest Test Expense');
    expect(response.body.amount).toBe('25.50'); // Remember, Postgres numeric types return as strings
  });

  it('GET /expenses - should return a list of expenses', async () => {
    const response = await request(app)
      .get('/expenses')
      .expect('Content-Type', /json/)
      .expect(200);

    // Verify it returns an array
    expect(Array.isArray(response.body)).toBe(true);
    
    // Verify our previously inserted test expense is in the list
    const testExpense = response.body.find((e: any) => e.description === 'Vitest Test Expense');
    expect(testExpense).toBeDefined();
  });

});