export class MyArray implements Iterable<unknown> {
  private _capacity: number

  private _container: unknown[]

  constructor(size: number) {
    this._capacity = size
    this._container = []
  }

  length(): number {
    return this._container.length
  }

  isEmpty(): boolean {
    return this._container.length === 0
  }

  clear(): void {
    this._container = []
  }

  push(value: unknown): void {
    if (this._container.length + 1 === this._capacity) this._capacity *= 2
    this._container.push(value)
  }

  unshift(value: unknown): void {
    if (this._container.length + 1 === this._capacity) this._capacity *= 2
    this._container.unshift(value)
  }

  get(index: number): unknown {
    this.checkIndex(index)
    return this._container[index]
  }

  pop(): unknown | undefined {
    return this._container.pop()
  }

  shift(): unknown | undefined {
    return this._container.shift()
  }

  removeAt(index: number): void {
    this.checkIndex(index)
    this._container.splice(index, 1)
  }

  indexOf(value: unknown): number | undefined {
    if (this.isEmpty()) return -1
    for (let i = 0; i < this._container.length; i++) {
      if (value === this._container[i]) return i
    }
    return -1
  }

  contains(value: unknown): boolean {
    return this.indexOf(value) !== -1
  }

  private checkIndex(index: number): void {
    if (index > this._container.length - 1)
      throw new RangeError(`Max index is ${this._container.length - 1}.`)
    if (index < 0) throw new RangeError(`Min index is 0.`)
  }

  [Symbol.iterator](): Iterator<unknown> {
    let i = 0
    return {
      next: () => ({
        value: this._container[i++],
        done: i > this._container.length,
      }),
    }
  }
}
