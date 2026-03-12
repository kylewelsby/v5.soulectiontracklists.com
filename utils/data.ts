const dataDir = new URL("../static/data/", import.meta.url).pathname;

function hashBucket(id: string, numBuckets: number): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % numBuckets;
}

export async function readJSON<T>(relativePath: string): Promise<T> {
  const text = await Deno.readTextFile(dataDir + relativePath);
  return JSON.parse(text);
}

export async function readChunkedData<T>(
  dir: string,
  id: string,
  numBuckets: number,
): Promise<T | undefined> {
  const bucket = hashBucket(id, numBuckets);
  const chunk = await readJSON<Record<string, T>>(`${dir}/chunks/${bucket}.json`);
  return chunk[id];
}
