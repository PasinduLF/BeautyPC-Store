const pool = require('../config/db');

const findByEmail = async (email) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

module.exports = {
  findByEmail,
};

