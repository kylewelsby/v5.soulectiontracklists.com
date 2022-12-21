export function timeToSeconds(string: string) {
  return (string || "00:00:00")
    .split(":")
    .map((v: string) => parseInt(v))
    .reduce((acc: number, time: number) => 60 * acc + time, 0);
}
