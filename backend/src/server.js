const dotenv = require('dotenv');
const app = require('./app');
const pool = require('./config/db');

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.getConnection();
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Beauty P&C API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
