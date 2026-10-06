import 'dotenv/config';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import contactRouter from './routes/contact.js';
import { getPool } from './db.js';

const app = express();
const port = Number(process.env.PORT ?? 5050);

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json({ limit: '50kb' }));

app.get('/api/health', async (_req, res) => {
  try {
    const pool = await getPool();
    await pool.query('SELECT 1');
    res.json({ ok: true, database: 'connected' });
  } catch {
    res.status(503).json({ ok: false, database: 'unavailable' });
  }
});

app.use('/api/contact', contactRouter);

// In production, serve the built React app from the same server.
const clientDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/^(?!\/api\/).*/, (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
  getPool()
    .then(() => console.log('MySQL connected (database and tables are ready).'))
    .catch((error: Error) => {
      console.warn(`MySQL is not reachable yet: ${error.message}`);
      console.warn('Start MySQL from the XAMPP Control Panel - the contact form will connect automatically.');
    });
});
