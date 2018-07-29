export function bClasses(type: string, is?: string): string[] {
  if(!is) return [type];
  return [type, ...is.split(' ').map(i => `is-${i}`)];
}