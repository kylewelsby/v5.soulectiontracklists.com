import * as postgres from "$postgres";
const databaseUrl = Deno.env.get("DATABASE_URL")!;
export const pool = new postgres.Pool(databaseUrl, 3, true);
