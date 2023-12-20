import mysql from 'mysql';

const mysqlConnection = (ConnectionConfig: mysql.ConnectionConfig) : mysql.Connection =>
  mysql.createConnection(ConnectionConfig);

export { mysqlConnection };
