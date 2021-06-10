interface IStack<T> {
  // return the number of elements in the stack
  size(): number

  // return if the stack is empty
  isEmpty(): boolean

  // push the element on the stack
  push(elem: T): void

  // pop the element off the stack
  pop(): T | undefined

  peek(): T | undefined
}

export class Stack implements IStack<number> {
  private _container: number[]

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
  push(elem: number): void {
    if (this._capacity < this._container.length + 1) this._capacity *= 2
    this._container.push(elem)
  }

  pop(): number | undefined {
    return this._container.pop()
  }
  peek(): number | undefined {
    return this._container[this._container.length - 1]
  }
}
