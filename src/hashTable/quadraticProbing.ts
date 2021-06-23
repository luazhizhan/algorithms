import { OpenAddressingBase } from './openAddressingBase'

export class HashTableQuadraticProbing<K, V> extends OpenAddressingBase<K, V> {
  constructor(
    capacity: number = OpenAddressingBase.DEFAULT_CAPACITY,
    loadFactor: number = OpenAddressingBase.DEFAULT_LOAD_FACTOR
  ) {
    super(capacity, loadFactor)
  }

  // Given a number this method finds the next
  // power of two above this value.
  private static nextPowerOfTwo(n: number): number {
    return this.highestOneBit(n) << 1
  }

  // get the highest 1 bit in binary of the number
  // https://stackoverflow.com/q/53369498
  private static highestOneBit(i: number) {
    i |= i >> 1
    i |= i >> 2
    i |= i >> 4
    i |= i >> 8
    i |= i >> 16
    return i - (i >>> 1)
  }

  // No setup required for quadratic probing.
  protected setupProbing(): void {
    return
  }

  protected probe(x: number): number {
    // Quadratic probing function (x^2+x)/2
    return (x * x + x) >> 1
  }

  // Increase the capacity of the hashtable to the next power of two.
  protected increaseCapacity(): void {
    this.capacity = HashTableQuadraticProbing.nextPowerOfTwo(this.capacity)
  }

  // Adjust the capacity of the hashtable to be a power of two.
  protected adjustCapacity(): void {
    const pow2 = HashTableQuadraticProbing.highestOneBit(this.capacity)
    if (this.capacity === pow2) return
    this.increaseCapacity()
  }
}
