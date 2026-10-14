import express, { Request, Response } from 'express';
import { db } from './db/index.js';   // Important: Use .js extension for local files in ES Modules!
import { expenses } from './db/schema.js';
import { desc } from 'drizzle-orm';


const app = express();

app.use(express.json());

// GET /expenses - Fetch all expenses, newest first


app.get('/expenses', async (req: Request, res: Response): Promise<any> => {
  try {
    const allExpenses = await db
      .select()
      .from(expenses)
      .orderBy(desc(expenses.date)); // Sorts by newest first
      
    return res.json(allExpenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});


// POST /expenses - Create a new expense

app.post('/expenses', async (req: Request, res: Response): Promise<any> => {
  try {
    const { description, amount, categoryId } = req.body;

    // Quick validation
    if (!description || amount === undefined) {
      return res.status(400).json({ error: 'Description and amount are required' });
    }

    // Insert into DB and return the newly created record
    const newExpense = await db.insert(expenses).values({
      description,
      amount: amount.toString(), // Numeric DB fields expect strings to prevent float rounding errors
      categoryId: categoryId || null
    }).returning(); // .returning() asks Postgres to send the inserted data back

    return res.status(201).json(newExpense[0]);
  } catch (error) {
    console.error("Error creating expense:", error);
    return res.status(500).json({ error: 'Failed to create expense' });
  }
});


export default app;