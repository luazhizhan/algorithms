import { Comparable, compareTo } from '../helper'

/**
 * An implementation of an indexed min D-ary heap priority queue.
 *
 * <p>This implementation supports arbitrary keys with comparable values. To use arbitrary keys
 * (such as strings or objects) first map all your keys to the integer domain [0, N) where N is the
 * number of keys you have and then use the mapping with this indexed priority queue.
 *
 * <p>As convention, I denote 'ki' as the index value in the domain [0, N) associated with a key k,
 * therefore: ki = map[k]
 *
 */
export class DHeap<T extends Comparable> {
  // Current number of elements in the heap.
  private sz = 0

  // Maximum number of elements in the heap.
  private N: number

  // The degree of every node in the heap.
  private D: number

  // Lookup arrays to track the child/parent indexes of each node.
  private child: number[]
  private parent: number[]

  // The Position Map (pm) maps Key Indexes (ki) to where the position of that
  // key is represented in the priority queue in the domain [0, sz).
  pm: number[]

  // The Inverse Map (im) stores the indexes of the keys in the range
  // [0, sz) which make up the priority queue. It should be noted that
  // 'im' and 'pm' are inverses of each other, so: pm[im[i]] = im[pm[i]] = i
  im: number[]

  // The values associated with the keys. It is very important  to note
  // that this array is indexed by the key indexes (aka 'ki').
  values: { [key in number]: T | undefined }

  constructor(degree: number, maxSize: number) {
    if (maxSize <= 0) throw new Error('maxSize <= 0')

    this.D = Math.max(2, degree)
    this.N = Math.max(this.D + 1, maxSize)

    this.im = new Array(this.N)
    this.pm = new Array(this.N)
    this.child = new Array(this.N)
    this.parent = new Array(this.N)
    this.values = {} as { [key in number]: T }

    for (let i = 0; i < this.N; i++) {
      this.parent[i] = (i - 1) / this.D
      this.child[i] = i * this.D + 1
      this.pm[i] = -1
      this.im[i] = -1
    }
  }

  size(): number {
    return this.sz
  }

  isEmpty(): boolean {
    return this.sz === 0
  }

  contains(ki: number): boolean {
    this.keyInBoundsOrThrow(ki)
    return this.pm[ki] !== -1
  }

  peekMinKeyIndex(): number {
    this.isNotEmptyOrThrow()
    return this.im[0] as number
  }

  pollMinKeyIndex(): number {
    const minki = this.peekMinKeyIndex()
    this.delete(minki)
    return minki
  }

  peekMinValue(): T {
    this.isNotEmptyOrThrow()
    return this.values[this.im[0] as number] as T
  }

  pollMinValue(): T {
    const minValue = this.peekMinValue()
    this.delete(this.peekMinKeyIndex())
    return minValue
  }

  insert(ki: number, value: T): void {
    if (this.contains(ki))
      throw new Error('index already exists; received: ' + ki)
    this.valueNotNullOrThrow(value)
    this.pm[ki] = this.sz
    this.im[this.sz] = ki
    this.values[ki] = value
    this.swim(this.sz++)
  }

  delete(ki: number): T {
    this.keyExistsOrThrow(ki)
    const i = this.pm[ki] as number
    this.swap(i, --this.sz)
    this.sink(i)
    this.swim(i)
    const value = this.values[ki] as T
    this.values[ki] = undefined
    this.pm[ki] = -1
    this.im[this.sz] = -1
    return value
  }

  update(ki: number, value: T): T {
    this.keyExistsAndValueNotNullOrThrow(ki, value)
    const i = this.pm[ki] as number
    const oldValue = this.values[ki] as T
    this.values[ki] = value
    this.sink(i)
    this.swim(i)
    return oldValue
  }

  // Strictly decreases the value associated with 'ki' to 'value'
  decrease(ki: number, value: T): void {
    this.keyExistsAndValueNotNullOrThrow(ki, value)
    if (this.lessT(value, this.values[ki] as T)) {
      this.values[ki] = value
      this.swim(this.pm[ki] as number)
    }
  }

  // Strictly increases the value associated with 'ki' to 'value'
  increase(ki: number, value: T): void {
    this.keyExistsAndValueNotNullOrThrow(ki, value)
    if (this.lessT(this.values[ki] as T, value)) {
      this.values[ki] = value
      this.sink(this.pm[ki] as number)
    }
  }

  private swap(i: number, j: number): void {
    const imJ = this.im[j]
    const imI = this.im[i]
    if (imJ === undefined || imI === undefined)
      throw new Error('Impossible case.')

    this.pm[imJ] = i
    this.pm[imI] = j
    const tmp = this.im[i] as number
    this.im[i] = this.im[j] as number
    this.im[j] = tmp
  }

  private sink(i: number): void {
    for (let j = this.minChild(i); j !== -1; ) {
      this.swap(i, j)
      i = j
      j = this.minChild(i)
    }
  }

  private swim(i: number) {
    const parentI = this.parent[i]
    if (parentI === undefined) throw new Error('Impossible case.')
    while (this.lessNumber(i, parentI)) {
      this.swap(i, parentI)
      i = parentI
    }
  }

  private minChild(i: number): number {
    let index = -1
    const from = this.child[i]
    if (from === undefined) throw new Error('Impossible case')
    const to = Math.min(this.sz, from + this.D)
    for (let j = from; j < to; j++) if (this.lessNumber(j, i)) index = i = j
    return index
  }

  lessNumber(num1: number, num2: number): boolean {
    return compareTo(num1, num2) < 0
  }

  lessT(obj1: T, obj2: T): boolean {
    return compareTo(obj1, obj2) < 0
  }

  valueOf(ki: number): T {
    this.keyExistsOrThrow(ki)
    return this.values[ki] as T
  }

  toString(): string {
    const lst = new Array(this.sz)
    for (let i = 0; i < this.sz; i++) lst.push(this.im[i])
    return lst.toString()
  }

  /* Helper functions to make the code more readable. */

  private keyInBoundsOrThrow(ki: number): void {
    if (ki < 0 || ki >= this.N)
      throw new Error('Key index out of bounds; received: ' + ki)
  }

  private keyExistsOrThrow(ki: number): void {
    if (this.contains(ki) === false)
      throw new Error('Index does not exist; received: ' + ki)
  }

  private isNotEmptyOrThrow(): void {
    if (this.isEmpty()) throw new Error('Priority queue underflow')
  }

  private valueNotNullOrThrow(value: T | undefined): void {
    if (value === undefined) throw new Error('value cannot be null')
  }

  private keyExistsAndValueNotNullOrThrow(ki: number, value: T): void {
    this.keyExistsOrThrow(ki)
    this.valueNotNullOrThrow(value)
  }

  /* Test functions */

  // Recursively checks if this heap is a min heap. This method is used
  // for testing purposes to validate the heap invariant.
  isMinHeap(): boolean {
    return this._isMinHeap(0)
  }

  private _isMinHeap(i: number): boolean {
    const from = this.child[i]
    if (from === undefined) throw new Error('Impossible case')
    const to = Math.min(this.sz, from + this.D)
    for (let j = from; j < to; j++) {
      if (this.lessNumber(i, j) === false) return false
      if (this._isMinHeap(j) === false) return false
    }
    return true
  }
}
