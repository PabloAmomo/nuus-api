interface databaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}
export interface FeedsConfig { 
  database: databaseConfig;
}