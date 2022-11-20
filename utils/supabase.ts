import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY");

if (SUPABASE_KEY === undefined || SUPABASE_URL === undefined) {
  throw new Error("env `SUPABASE_KEY` and `SUPABASE_URL` must be set");
}

export async function graphql<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const resp = await fetch(`${SUPABASE_URL}/graphql/v1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "apikey": SUPABASE_KEY!,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`${resp.status} ${body}`);
  }
  const json = await resp.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: Error) => e.message).join("\n"));
  }
  return json.data as T;
}

export const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);
