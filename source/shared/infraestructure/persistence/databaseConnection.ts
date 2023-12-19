import mysql from 'mysql';
import { mysqlConnection } from './mysqlConnection';
import { DatabaseConnectionConfig } from '../../models/DatabaseConnectionConfig';
import { DatabaseConnection } from '../../models/DatabaseConnection';

const databaseConnection = (ConnectionConfig: DatabaseConnectionConfig) : DatabaseConnection =>
  mysqlConnection(ConnectionConfig);

export { databaseConnection };
