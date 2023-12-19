import mysqlQuery from './mysqlQuery';
import { DatabaseConnectionConfig } from '../models/DatabaseConnectionConfig';

/** Query the database */
async function databaseQuery(ConnectionConfig: DatabaseConnectionConfig , query: string, values: any[]): Promise<any> {
  return mysqlQuery(ConnectionConfig, query, values);
}

export default databaseQuery;
