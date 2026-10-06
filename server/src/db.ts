import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
};

const database = process.env.DB_NAME ?? 'kalai_portfolio';

let pool: mysql.Pool | null = null;

/**
 * Creates the database and tables if they do not exist yet, so a fresh XAMPP
 * install works without importing database/schema.sql by hand.
 */
async function createPool(): Promise<mysql.Pool> {
  if (!/^[A-Za-z0-9_]+$/.test(database)) {
    throw new Error(`DB_NAME "${database}" may only contain letters, numbers and underscores`);
  }

  const bootstrap = await mysql.createConnection(config);
  try {
    await bootstrap.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  } finally {
    await bootstrap.end();
  }

  const created = mysql.createPool({ ...config, database, connectionLimit: 5 });
  await created.query(`
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
  return created;
}

/** Lazily connects, and retries on the next call if MySQL was not running yet. */
export async function getPool(): Promise<mysql.Pool> {
  if (!pool) {
    pool = await createPool();
  }
  return pool;
}
