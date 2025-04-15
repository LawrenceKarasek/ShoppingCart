import { Client } from 'pg'; // or your preferred PostgreSQL client/ORM

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'shorturl',
  JWT_SECRET:process.env.JWT_SECRET || 'ksDvhwv0Sqv1cYzQSXI9/adi977eg6UZdsdnRIkjEcg=',
};

export const dbClient = new Client(dbConfig);

export const startDatabase = async () => {
  try {
    await dbClient.connect();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit with failure code
  }
};