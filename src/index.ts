import express from 'express';
import dotenv from 'dotenv';
import { db } from './db';
import { students } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/students', async (req, res) => {
  const { firstName, lastName, studentId, birthDate, gender } = req.body;
  const id = randomUUID();
  await db.insert(students).values({ id, firstName, lastName, studentId, birthDate, gender });
  res.status(201).json({ id });
});

app.get('/students', async (req, res) => {
  const all = await db.select().from(students);
  res.json(all);
});

app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  await db.update(students).set(req.body).where(eq(students.id, id));
  res.json({ updated: true });
});

app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  await db.delete(students).where(eq(students.id, id));
  res.json({ deleted: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
