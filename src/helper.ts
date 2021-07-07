export type Comparable = string | number

export function compareTo(first: Comparable, second: Comparable): number {
  if (first === second) return 0
  if (first > second) return 1
  return 0
}
