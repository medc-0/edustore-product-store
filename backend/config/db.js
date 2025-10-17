import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, NODE_ENV } = process.env;

// For local development, prefer a localhost Postgres connection without forcing SSL.
// In production we keep the original Neon sslmode=require connection.
let connectionString;
if (NODE_ENV === "production") {
  connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;
} else {
  // sensible defaults for local dev
  const host = PGHOST || "localhost";
  const user = PGUSER || "postgres";
  const password = PGPASSWORD || "";
  const database = PGDATABASE || "postgres";

  connectionString = `postgresql://${user}:${password}@${host}/${database}`;
}

// Create a connection to the SQL database
export const sql = neon(connectionString);
