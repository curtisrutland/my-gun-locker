export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  var chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    let chunk = arr.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}