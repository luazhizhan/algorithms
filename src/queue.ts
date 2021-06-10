interface IQueue<T> {
  offer(elem: T): void

  poll(): T | undefined

  peek(): T | undefined

  size(): number

  isEmpty(): boolean
}

export class Queue implements IQueue<number> {
  private _container: number[]

  // For static array which doesn't exist in JS
  private _capacity: number

  constructor() {
    this._capacity = 2
    this._container = []
  }

  size(): number {
    return this._container.length
  }
  isEmpty(): boolean {
    return this._container.length === 0
  }

  offer(elem: number): void {
    if (this._capacity < this._container.length + 1) this._capacity *= 2
    this._container.push(elem)
  }
  poll(): number | undefined {
    return this._container.shift()
  }
  peek(): number | undefined {
    return this._container[0]
  }
}
