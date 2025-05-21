import { Client } from 'pg'; 

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'shoppingcart_admin',
  password: process.env.DB_PASSWORD || 'shoppingcart_pwd',
  database: process.env.DB_NAME || 'shoppingcart'
};

export const dbClient = new Client(dbConfig);

export const startDatabase = async () => {

  try {
    const adminClient = new Client({
      ...dbConfig,
      database: 'postgres'
    });
    await adminClient.connect();

    const dbExists = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbConfig.database]
    );
    
    if (dbExists.rowCount === 0) {
      await adminClient.query(
        `CREATE DATABASE ${dbConfig.database} OWNER ${dbConfig.user}`
      );
      console.log(`Created database: ${dbConfig.database}`);
    }

    await adminClient.end();

    await dbClient.connect();
    console.log(`Connected to PostgreSQL database: ${dbConfig.database}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};