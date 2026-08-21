import { pool } from '../config/pg';

export async function getUser(userId: string) {
  try {
    const client = await pool.connect();

    await client.query('BEGIN');

    const result = await pool.query(
      `
        SELECT *
        FROM users
        WHERE id = $1
     `,
      [userId]
    );

    const user = result.rows[0];

    if (!user) {
      throw new Error('Cannot find user');
    }

    return user;
  } catch (error) {}
}
