import { databaseConnection } from './databaseConnection';
import mysql from 'mysql';

/** Query the database */
async function databaseQuery(ConnectionConfig: mysql.ConnectionConfig , sql: string, values: any[]): Promise<any> {
  // 'SELECT * FROM `books` WHERE `author` = ?', ['David']
  const promise = new Promise((resolve, reject) => {
    const connection = databaseConnection(ConnectionConfig);
    connection.on('error', (error) => reject(error));
    connection.connect();
    connection.query(sql, values, (error, results) => {
      if (error) reject(error)
      else resolve(results);
      connection.end();
    });
  });
  return promise;
}

export default databaseQuery;
