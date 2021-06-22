import { OpenAddressingBase } from './openAddressingBase'

export class HashTableLinearProbing<K, V> extends OpenAddressingBase<K, V> {
  // This is the linear constant used in the linear probing, it can be
  // any positive number. The table capacity will be adjusted so that
  // the GCD(capacity, LINEAR_CONSTANT) = 1 so that all buckets can be probed.
  private static LINEAR_CONSTANT = 17

  constructor(
    capacity: number = OpenAddressingBase.DEFAULT_CAPACITY,
    loadFactor: number = OpenAddressingBase.DEFAULT_LOAD_FACTOR
  ) {
    super(capacity, loadFactor)
  }

  protected setupProbing(): void {
    return
  }

  protected probe(x: number): number {
    return HashTableLinearProbing.LINEAR_CONSTANT * x
  }

  // Adjust the capacity so that the linear constant and
  // the table capacity are relatively prime.
  protected adjustCapacity(): void {
    while (
      OpenAddressingBase.gcd(
        HashTableLinearProbing.LINEAR_CONSTANT,
        this.capacity
      ) !== 1
    ) {
      this.capacity++
    }
  }
}
