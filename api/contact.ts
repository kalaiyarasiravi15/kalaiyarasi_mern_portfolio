import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  ssl: process.env.DB_SSL === 'true' || process.env.DB_HOST?.includes('tidb') || process.env.DB_HOST?.includes('aiven') ? { rejectUnauthorized: false } : undefined,
};

const database = process.env.DB_NAME || 'kalai_portfolio';

let pool: mysql.Pool | null = null;

async function getPool(): Promise<mysql.Pool> {
  if (!pool) {
    if (process.env.DATABASE_URL) {
      pool = mysql.createPool({
        uri: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionLimit: 3,
        waitForConnections: true,
      });
    } else {
      pool = mysql.createPool({
        ...config,
        database,
        connectionLimit: 3,
        waitForConnections: true,
      });
    }

    // Auto-create table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        full_name VARCHAR(120) NOT NULL,
        email VARCHAR(190) NOT NULL,
        service VARCHAR(80) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_contact_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }
  return pool;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const p = await getPool();
      await p.query('SELECT 1');
      return res.status(200).json({ ok: true, database: 'connected' });
    } catch {
      return res.status(200).json({ ok: true, database: 'ready' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

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
    return res.status(400).json({ ok: false, errors });
  }

  try {
    const p = await getPool();
    const [result]: any = await p.execute(
      'INSERT INTO contact_messages (full_name, email, service, message) VALUES (?, ?, ?, ?)',
      [fullName, email, service, message]
    );
    return res.status(201).json({ ok: true, id: result.insertId });
  } catch (error) {
    console.error('Failed to save contact message to database:', error);
    return res.status(503).json({
      ok: false,
      message: 'Could not save your message right now. Please try again in a moment.',
    });
  }
}
