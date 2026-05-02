import { Pool } from "pg";
import configFile from "./env";

export const pool = new Pool({
  connectionString: configFile.connection_string,
});

export default pool;