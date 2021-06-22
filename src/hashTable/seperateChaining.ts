import { hashCode, normalizeIndex } from './utils'

class Entry<K, V> {
  hash: number

  key: K

  value: V

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
    this.hash = hashCode(key)
  }

  // We are not overriding the Object equals method
  // No casting is required with this method.
  equals(other: Entry<K, V>): boolean {
    if (this.hash !== other.hash) return false
    return this.key === other.key
  }

  toString(): string {
    return this.key + ' => ' + this.value
  }
}

export class HashTableSeparateChaining<K, V> implements Iterable<K> {
  private static _DEFAULT_CAPACITY = 3
  private static _DEFAULT_LOAD_FACTOR = 0.75

  private _maxLoadFactor: number

  private _capacity = 0

  private _threshold = 0 // Integer only

  private _size = 0
  private _table: Entry<K, V>[][] = []

  constructor(
    capacity: number = HashTableSeparateChaining._DEFAULT_CAPACITY,
    maxLoadFactor: number = HashTableSeparateChaining._DEFAULT_LOAD_FACTOR
  ) {
    // cannot have decimal place
    if (capacity < 0 || capacity % 1 !== 0) throw new Error('Illegal capacity')
    if (
      maxLoadFactor <= 0 ||
      Number.isNaN(maxLoadFactor) ||
      Number.isFinite(maxLoadFactor) === false
    ) {
      throw new Error('Illegal maxLoadFactor')
    }
    this._maxLoadFactor = maxLoadFactor
    this._capacity = Math.max(
      HashTableSeparateChaining._DEFAULT_CAPACITY,
      capacity
    )
    this._threshold = Math.round(this._capacity * maxLoadFactor)
  }

  // Returns the number of elements currently inside the hash-table
  size(): number {
    return this._size
  }

  // Returns true/false depending on whether the hash-table is empty
  isEmpty(): boolean {
    return this._size === 0
  }

  clear(): void {
    this._table = []
    this._size = 0
  }

  containsKey(key: K): boolean {
    return this.hasKey(key)
  }

  // Returns true/false depending on whether a key is in the hash table
  hasKey(key: K): boolean {
    const bucketIndex = normalizeIndex(hashCode(key), this._capacity)
    return this._bucketSeekEntry(bucketIndex, key) !== null
  }

  // Insert, put and add all place a value in the hash-table
  put(key: K, value: V): V | null {
    return this.insert(key, value)
  }

  add(key: K, value: V): V | null {
    return this.insert(key, value)
  }

  insert(key: K, value: V): V | null {
    const newEntry = new Entry(key, value)
    const bucketIndex = normalizeIndex(newEntry.hash, this._capacity)
    return this._bucketInsertEntry(bucketIndex, newEntry)
  }

  // Gets a key's values from the map and returns the value.
  // NOTE: returns null if the value is null AND also returns
  // null if the key does not exists, so watch out..
  get(key: K): V | null {
    const bucketIndex = normalizeIndex(hashCode(key), this._capacity)
    const entry = this._bucketSeekEntry(bucketIndex, key)
    if (entry === null) return null
    return entry.value
  }

  // Removes a key from the map and returns the value.
  // NOTE: returns null if the value is null AND also returns
  // null if the key does not exists.
  remove(key: K): V | null {
    const bucketIndex = normalizeIndex(hashCode(key), this._capacity)
    return this._bucketRemoveEntry(bucketIndex, key)
  }

  // Returns the list of keys found within the hash table
  keys(): K[] {
    const keys: K[] = []
    for (const bucket of this._table) {
      if (bucket === undefined) continue
      for (const entry of bucket) keys.push(entry.key)
    }
    return keys
  }

  // Returns the list of values found within the hash table
  values(): V[] {
    const values: V[] = []
    for (const bucket of this._table) {
      for (const entry of bucket) values.push(entry.value)
    }
    return values
  }

  [Symbol.iterator](): Iterator<K> {
    let i = 0
    const keys = this.keys()
    return {
      next: () => ({
        // impossible to be undefined
        value: keys[i++] as K,
        done: i > keys.length,
      }),
    }
  }

  private _bucketRemoveEntry(bucketIndex: number, key: K): V | null {
    const entry = this._bucketSeekEntry(bucketIndex, key)
    if (entry === null) return null
    // impossible to be undefined
    const bucket = this._table[bucketIndex] as Entry<K, V>[]

    this._table[bucketIndex] = bucket.filter((a) => a.equals(entry) === false)
    this._size--
    return entry.value
  }

  // Inserts an entry in a given bucket only if the entry does not already
  // exist in the given bucket, but if it does then update the entry value
  private _bucketInsertEntry(
    bucketIndex: number,
    entry: Entry<K, V>
  ): V | null {
    let bucket = this._table[bucketIndex]
    if (bucket === undefined) {
      this._table[bucketIndex] = []
      // impossible to be undefined
      bucket = this._table[bucketIndex] as Entry<K, V>[]
    }
    const existentEntry = this._bucketSeekEntry(bucketIndex, entry.key)

    if (existentEntry === null) {
      bucket.push(entry)
      if (++this._size > this._threshold) this._resizeTable()
      return null // Use null to indicate that there was no previous entry
    }
    const oldVal = existentEntry.value
    existentEntry.value = entry.value
    return oldVal
  }

  // Finds and returns a particular entry in a given bucket
  // if it exists, returns null otherwise
  private _bucketSeekEntry(bucketIndex: number, key: K): Entry<K, V> | null {
    if (key === null) return null
    const bucket = this._table[bucketIndex]
    if (bucket === undefined) return null
    for (const entry of bucket) if (entry.key === key) return entry
    return null
  }

  // Resizes the internal table holding buckets of entries
  private _resizeTable(): void {
    this._capacity *= 2
    this._threshold = Math.round(this._capacity * this._maxLoadFactor)
    const newTable: Entry<K, V>[][] = []
    for (let i = 0; i < this._table.length; i++) {
      const oldBucket = this._table[i]
      if (oldBucket === undefined) continue
      for (const entry of oldBucket) {
        const bucketIndex = normalizeIndex(entry.hash, this._capacity)
        let newBucket = newTable[bucketIndex]
        if (newBucket === undefined) newTable[bucketIndex] = newBucket = []
        newBucket.push(entry)
      }
    }
    this._table = newTable
  }
}
