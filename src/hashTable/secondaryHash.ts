export interface SecondaryHash {
  _hashCode2(): number
}

export function instanceOfSecondaryHash(
  object: unknown
): object is SecondaryHash {
  const hash = object as SecondaryHash
  return hash._hashCode2 !== undefined && typeof hash._hashCode2 === 'function'
}
