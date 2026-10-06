import { Router } from 'express';
import type { ResultSetHeader } from 'mysql2';
import { getPool } from '../db.js';

const router = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

router.post('/', async (req, res) => {
  const fullName = clean(req.body?.fullName);
  const email = clean(req.body?.email);
  const service = clean(req.body?.service) || clean(req.body?.subject) || 'General Message';
  const message = clean(req.body?.message);

  const errors: Record<string, string> = {};
  if (!fullName) errors.fullName = 'Please enter your full name.';
  else if (fullName.length > 120) errors.fullName = 'Name is too long.';
  if (!email) errors.email = 'Please enter your email.';
  else if (!EMAIL_PATTERN.test(email) || email.length > 190) errors.email = 'Please enter a valid email.';
  if (service.length > 80) errors.service = 'Service/Subject is too long.';
  if (!message) errors.message = 'Please write a message.';
  else if (message.length > 5000) errors.message = 'Message is too long.';

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ ok: false, errors });
    return;
  }

  try {
    const pool = await getPool();
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO contact_messages (full_name, email, service, message) VALUES (?, ?, ?, ?)',
      [fullName, email, service, message],
    );
    res.status(201).json({ ok: true, id: result.insertId });
  } catch (error) {
    console.error('Failed to save contact message:', error);
    res.status(503).json({
      ok: false,
      message: 'Could not save your message right now. Please try again in a moment.',
    });
  }
});

export default router;
