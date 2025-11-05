const pool = require('../db');

exports.getAll = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT * FROM students');

    conn.release();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching students' });
  }
};
