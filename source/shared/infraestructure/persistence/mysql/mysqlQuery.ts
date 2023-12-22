import { databaseConnection } from '../databaseConnection';
import mysql from 'mysql';

/** Query the database */
function mysqlQuery(ConnectionConfig: mysql.ConnectionConfig , sql: string, values: any[], onResult: CallableFunction, onError: CallableFunction) {
  try {
    const connection = databaseConnection(ConnectionConfig);
    connection.on('error', (error) => onError(error));
    connection.connect();
    connection.query(sql, values, (error:mysql.MysqlError | null, results:any[]) => {
      if (error) onError(error)
      else onResult(results);
      connection.end();
    });
  } catch (error) {
    onError(error);
  }
}

export default mysqlQuery;
