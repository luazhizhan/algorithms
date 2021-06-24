import { OpenAddressingBase } from './openAddressingBase'
import { SecondaryHash } from './secondaryHash'
import { hashCode, normalizeIndex } from './utils'

export class HashTableDoubleHashing<
  K extends SecondaryHash,
  V
> extends OpenAddressingBase<K, V> {
  private hash = 0

  constructor(
    capacity: number = OpenAddressingBase.DEFAULT_CAPACITY,
    loadFactor: number = OpenAddressingBase.DEFAULT_LOAD_FACTOR
  ) {
    super(capacity, loadFactor)
  }

  protected setupProbing(key: K): void {
    // Cache second hash value.
    this.hash = normalizeIndex(hashCode(key._hashCode2()), this.capacity)

    // Fail safe to avoid infinite loop.
    if (this.hash === 0) this.hash = 1
  }

  protected probe(x: number): number {
    return x * this.hash
  }

  // Adjust the capacity until it is a prime number. The reason for
  // doing this is to help ensure that the GCD(hash, capacity) = 1 when
  // probing so that all the cells can be reached.
  protected adjustCapacity(): void {
    while (this.isProbablePrime(this.capacity) === false) {
      this.capacity++
    }
  }

  private isProbablePrime(num: number): boolean {
    for (let i = 2; i < num; i++) if (num % i === 0) return false
    return num > 1
  }
}
