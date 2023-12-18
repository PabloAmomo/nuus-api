import { configDotenv } from 'dotenv';
configDotenv();

const config = {
  database: {
    host: `${process.env.FEEDS_MYSQL_HOST}`,
    user: process.env.FEEDS_MYSQL_USER,
    password: process.env.FEEDS_MYSQL_PASSWORD,
    database: process.env.FEEDS_MYSQL_DATABASE,
    port: parseInt(process.env.FEEDS_MYSQL_PORT ?? '3306'),
  }
};

export default config