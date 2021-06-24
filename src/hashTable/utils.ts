import { instanceOfSecondaryHash } from './secondaryHash'

// Converts a hash value to an index. Essentially, this strips the
// negative sign and places the hash value in the domain [0, capacity)
export function normalizeIndex(keyHash: number, capacity: number): number {
  return (keyHash & 0x7fffffff) % capacity
}

export function hashCode(key: unknown): number {
  const s = JSON.stringify(
    instanceOfSecondaryHash(key) ? key._hashCode2() : key
  )
  let h = 1
  let i = 0
  for (i; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return h
}
