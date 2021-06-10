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

  push(value: unknown): void {
    if (this._container.length + 1 === this._capacity) this._capacity *= 2
    this._container.push(value)
  }

  unshift(value: unknown): void {
    if (this._container.length + 1 === this._capacity) this._capacity *= 2
    this._container.unshift(value)
  }

  get(index: number): unknown {
    if (this._container.length - 1 < index)
      throw new RangeError(`Max index is ${this._container.length - 1}.`)
    if (index < 0) throw new RangeError(`Min index is 0.`)
    return this._container[index]
  }

  pop(): unknown | undefined {
    return this._container.pop()
  }

  shift(): unknown | undefined {
    return this._container.shift()
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
