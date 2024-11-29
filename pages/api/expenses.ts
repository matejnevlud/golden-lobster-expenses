import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../db';
import { expenses } from '../../db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const expense = await db.insert(expenses).values(req.body);
    res.status(200).json(expense);
  } catch (error) {
    console.error('Error saving expense:', error);
    res.status(500).json({ message: 'Error saving expense' });
  }
}
