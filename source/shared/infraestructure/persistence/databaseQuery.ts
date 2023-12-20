import mysqlQuery from './mysql/mysqlQuery';
import { DatabaseConnectionConfig } from '../models/DatabaseConnectionConfig';

/** Query the database */
function databaseQuery(ConnectionConfig: DatabaseConnectionConfig , query: string, values: any[], onResult: CallableFunction, onError: CallableFunction) {
  return mysqlQuery(ConnectionConfig, query, values, onResult, onError);
}

export default databaseQuery;
