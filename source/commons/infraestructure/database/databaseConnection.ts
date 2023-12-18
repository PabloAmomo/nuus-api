import mysql from 'mysql';

const databaseConnection = (ConnectionConfig: mysql.ConnectionConfig) : mysql.Connection =>
  mysql.createConnection(ConnectionConfig);

export { databaseConnection };
