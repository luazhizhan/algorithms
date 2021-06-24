import { hashCode, normalizeIndex } from './utils'
import { instanceOfSecondaryHash } from './secondaryHash'

export abstract class OpenAddressingBase<K, V> implements Iterable<K> {
  protected loadFactor: number

  protected capacity: number
  protected threshold: number

  // 'usedBuckets' counts the total number of used buckets inside the
  // hash-table (includes cells marked as deleted). While 'keyCount'
  // tracks the number of unique keys currently inside the hash-table.
  protected usedBuckets: number
  protected keyCount: number

  // These arrays store the key-value pairs.
  protected _keys: K[]
  protected _values: V[]

  // Special marker token used to indicate the deletion of a key-value pair
  protected TOMBSTONE: K = new Object('TOMBSTONE') as K

  protected static DEFAULT_CAPACITY = 7
  protected static DEFAULT_LOAD_FACTOR = 0.65

  protected constructor(
    capacity: number = OpenAddressingBase.DEFAULT_CAPACITY,
    loadFactor: number = OpenAddressingBase.DEFAULT_LOAD_FACTOR
  ) {
    // cannot have decimal place
    if (capacity < 0 || capacity % 1 !== 0)
      throw new Error('Illegal capacity: ' + capacity)
    if (
      loadFactor <= 0 ||
      Number.isNaN(loadFactor) ||
      Number.isFinite(loadFactor) === false
    ) {
      throw new Error('Illegal loadFactor: ' + loadFactor)
    }

    this.loadFactor = loadFactor
    this.capacity = Math.max(OpenAddressingBase.DEFAULT_CAPACITY, capacity)
    this.adjustCapacity()

    this.threshold = Math.round(this.capacity * loadFactor)
    this._keys = []
    this._values = []

    this.usedBuckets = 0
    this.keyCount = 0
  }

  // These three methods are used to dictate how the probing is to actually
  // occur for whatever open addressing scheme you are implementing.
  protected abstract setupProbing(key: K): void

  protected abstract probe(x: number): number

  // Adjusts the capacity of the hash table after it's been made larger.
  // This is important to be able to override because the size of the hashtable
  // controls the functionality of the probing function.
  protected abstract adjustCapacity(): void

  // Increases the capacity of the hash table.
  protected increaseCapacity(): void {
    this.capacity = 2 * this.capacity + 1
  }

  clear(): void {
    this._keys = []
    this._values = []
    this.usedBuckets = 0
    this.keyCount = 0
  }

  // Returns the number of keys currently inside the hash-table
  size(): number {
    return this.keyCount
  }

  // Returns the capacity of the hashtable (used mostly for testing)
  getCapacity(): number {
    return this.capacity
  }

  // Returns true/false depending on whether the hash-table is empty
  isEmpty(): boolean {
    return this.keyCount === 0
  }

  put(key: K, value: V): V | null {
    return this.insert(key, value)
  }

  add(key: K, value: V): V | null {
    return this.insert(key, value)
  }

  // Returns true/false on whether a given key exists within the hash-table.
  containsKey(key: K): boolean {
    return this.hasKey(key)
  }

  // Returns a list of keys found in the hash table
  keys(): K[] {
    const keys = []
    for (let i = 0; i < this.capacity; i++) {
      const key = this._keys[i]
      if (key !== undefined && key !== this.TOMBSTONE) keys.push(key)
    }
    return keys
  }

  // Returns a list of non-unique values found in the hash table
  values(): V[] {
    const values = []
    for (let i = 0; i < this.capacity; i++) {
      const key = this._keys[i]
      const value = this._values[i]
      if (key !== undefined && key !== this.TOMBSTONE && value !== undefined)
        values.push(value)
    }
    return values
  }

  // Returns true/false on whether a given key exists within the hash-table
  hasKey(key: K): boolean {
    this.setupProbing(key)
    const offSet = normalizeIndex(hashCode(key), this.capacity)
    let i = offSet
    let j = -1
    let x = 1

    // Start at the original hash value and probe until we find a spot where our key
    // is or hit a null element in which case our element does not exist.
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const iKey = this._keys[i]

      // Ignore deleted cells, but record where the first index
      // of a deleted cell is found to perform lazy relocation later.
      if (iKey === this.TOMBSTONE) {
        if (j === -1) j = i
        // We hit a non-null key, perhaps it's the one we're looking for.
      } else if (iKey !== undefined) {
        // Use the hash code for key that is a secondary hash object
        const iKeyCode = (
          instanceOfSecondaryHash(iKey) ? iKey._hashCode2() : iKey
        ) as K
        const kKeyCode = (
          instanceOfSecondaryHash(key) ? key._hashCode2() : key
        ) as K

        // The key we want is in the hash-table!
        if (iKeyCode === kKeyCode) {
          const iValues = this._values[i]

          // If j != -1 this means we previously encountered a deleted cell.
          // We can perform an optimization by swapping the entries in cells
          // i and j so that the next time we search for this key it will be
          // found faster. This is called lazy deletion/relocation.
          if (j !== -1 && iValues !== undefined) {
            // Swap the key-value pairs of positions i and j.
            this._keys[j] = iKey
            this._values[j] = iValues
            this._keys[i] = this.TOMBSTONE
            delete this._values[i]
          }
          return true
        }
        // Key was not found in the hash-table :/
      } else return false
      i = normalizeIndex(offSet + this.probe(x++), this.capacity)
    }
  }

  // Get the value associated with the input key.
  // NOTE: returns null if the value is null AND also returns
  // null if the key does not exists.
  get(key: K): V | null {
    this.setupProbing(key)
    const offSet = normalizeIndex(hashCode(key), this.capacity)
    let i = offSet
    let j = -1
    let x = 1

    // Start at the original hash value and probe until we find a spot where our key
    // is or we hit a null element in which case our element does not exist.
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const iKey = this._keys[i]

      // Ignore deleted cells, but record where the first index
      // of a deleted cell is found to perform lazy relocation later.
      if (iKey === this.TOMBSTONE) {
        if (j === -1) j = i

        // We hit a non-null key, perhaps it's the one we're looking for.
      } else if (iKey !== undefined) {
        // Use the hash code for key that is a secondary hash object
        const iKeyCode = (
          instanceOfSecondaryHash(iKey) ? iKey._hashCode2() : iKey
        ) as K
        const kKeyCode = (
          instanceOfSecondaryHash(key) ? key._hashCode2() : key
        ) as K

        // The key we want is in the hash-table!
        if (iKeyCode === kKeyCode) {
          const iValues = this._values[i]
          if (iValues === undefined) return null

          // If j != -1 this means we previously encountered a deleted cell.
          // We can perform an optimization by swapping the entries in cells
          // i and j so that the next time we search for this key it will be
          // found faster. This is called lazy deletion/relocation.
          if (j !== -1) {
            // Swap key-values pairs at indexes i and j.
            this._keys[j] = iKey
            this._values[j] = iValues
            this._keys[i] = this.TOMBSTONE
            delete this._values[i]
          }
          return iValues
        }
        // Element was not found in the hash-table :/
      } else return null
      i = normalizeIndex(offSet + this.probe(x++), this.capacity)
    }
  }

  // Removes a key from the map and returns the value.
  // NOTE: returns null if the value is null AND also returns
  // null if the key does not exists.
  remove(key: K): V | null {
    this.setupProbing(key)
    const offSet = normalizeIndex(hashCode(key), this.capacity)
    let i = offSet
    let x = 1

    // Starting at the original hash probe until we find a spot where our key is
    // or we hit a null element in which case our element does not exist.
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const iKey = this._keys[i]

      // Ignore deleted cells
      if (iKey === this.TOMBSTONE) {
        i = normalizeIndex(offSet + this.probe(x++), this.capacity)
        continue
      }

      // Key was not found in hash-table.
      if (iKey === undefined) return null

      // Use the hash code for key that is a secondary hash object
      const iKeyCode = (
        instanceOfSecondaryHash(iKey) ? iKey._hashCode2() : iKey
      ) as K
      const kKeyCode = (
        instanceOfSecondaryHash(key) ? key._hashCode2() : key
      ) as K

      // The key we want to remove is in the hash-table!
      if (iKeyCode === kKeyCode) {
        this.keyCount--
        const oldValue = this._values[i]
        if (oldValue === undefined) return null
        this._keys[i] = this.TOMBSTONE
        delete this._values[i]
        return oldValue
      }
      i = normalizeIndex(offSet + this.probe(x++), this.capacity)
    }
  }

  // Return a String view of this hash-table.
  toString(): string {
    let sb = '{'
    for (let i = 0; i < this.capacity; i++) {
      const key = this._keys[i]
      if (key !== undefined && key !== this.TOMBSTONE)
        sb += `${key} => ${this._values[i]}, `
    }
    sb += '}'
    return sb
  }

  [Symbol.iterator](): Iterator<K> {
    let i = 0
    let keyLeft = this.keyCount
    const keys = this._keys
    return {
      next: () => {
        // find key that exist
        while (keys[i] === undefined || keys[i] === this.TOMBSTONE) i++

        keyLeft-- // reduce number of keys left
        return {
          // impossible to be undefined
          value: keys[i++] as K,
          done: keyLeft === 0,
        }
      },
    }
  }

  insert(key: K, val: V): V | null {
    if (this.usedBuckets >= this.threshold) this.resizeTable()
    this.setupProbing(key)
    const offSet = normalizeIndex(hashCode(key), this.capacity)

    let i = offSet
    let j = -1
    let x = 1

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const iKey = this._keys[i]
      // The current slot was previously deleted
      if (iKey === this.TOMBSTONE) {
        if (j === -1) j = i
        // The current cell already contains a key
      } else if (iKey !== undefined) {
        // The key we're trying to insert already exists in the hash-table,
        // so update its value with the most recent value

        // Use the hash code for key that is a secondary hash object
        const iKeyCode = (
          instanceOfSecondaryHash(iKey) ? iKey._hashCode2() : iKey
        ) as K
        const kKeyCode = (
          instanceOfSecondaryHash(key) ? key._hashCode2() : key
        ) as K

        if (iKeyCode === kKeyCode) {
          const oldValue = this._values[i]
          if (j === -1) {
            this._values[i] = val
          } else {
            // optimise by swapping the deleted entry with current entry
            this._keys[i] = this.TOMBSTONE
            delete this._values[i]
            this._keys[j] = key
            this._values[j] = val
          }
          return oldValue as V | null
        }
        // Current cell is null so an insertion/update can occur
      } else {
        // No previously encountered deleted buckets
        if (j === -1) {
          this.usedBuckets++
          this.keyCount++
          this._keys[i] = key
          this._values[i] = val

          // Previously seen deleted bucket. Instead of inserting
          // the new element at i where the null element is insert
          // it where the deleted token was found.
        } else {
          this.keyCount++
          this._keys[j] = key
          this._values[j] = val
        }

        return null
      }
      i = normalizeIndex(offSet + this.probe(x++), this.capacity)
    }
  }

  // Finds the greatest common denominator of a and b.
  protected static gcd(a: number, b: number): number {
    if (b === 0) return a
    return this.gcd(b, a % b)
  }

  protected resizeTable(): void {
    this.increaseCapacity()
    this.adjustCapacity()
    this.threshold = Math.round(this.capacity * this.loadFactor)

    let oldKeyTable = [] as K[]
    let oldValueTable = [] as V[]

    // Perform key table pointer swap
    const keyTableTmp = this._keys
    this._keys = oldKeyTable
    oldKeyTable = keyTableTmp

    // Perform value table pointer swap
    const valueTableTmp = this._values
    this._values = oldValueTable
    oldValueTable = valueTableTmp

    // Reset the key count and buckets used since we are about to
    // re-insert all the keys into the hash-table.
    this.keyCount = 0
    this.usedBuckets = 0

    for (let i = 0; i < oldKeyTable.length; i++) {
      const oldKey = oldKeyTable[i]
      const oldValue = oldValueTable[i]
      if (
        oldKey !== undefined &&
        oldKey !== this.TOMBSTONE &&
        oldValue !== undefined
      ) {
        this.insert(oldKey, oldValue)
      }
      delete oldValueTable[i]
      delete oldKeyTable[i]
    }
  }
}
