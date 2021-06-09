class LinkNode {
  value: unknown
  next: LinkNode | null

  constructor(value: unknown, next: LinkNode | null = null) {
    this.value = value
    this.next = next
  }
}

export class LinkList {
  private _head: LinkNode | null

  private _tail: LinkNode | null

  private _size: number

  constructor(value: unknown) {
    this._head = new LinkNode(value)
    this._tail = this._head
    this._size = 1
  }

  size(): number {
    return this._size
  }

  head(): unknown | null {
    return this._head ? this._head.value : null
  }

  tail(): unknown | null {
    return this._tail ? this._tail.value : null
  }

  get(index: number): unknown | null {
    if (index < 0) throw new RangeError('Minimum index is 0.')
    const max = this.size()
    if (index > max - 1) throw new RangeError(`Maximum index is ${max}`)
    if (index === 0) return this.head()
    if (index === max) return this.tail()

    let i = 0
    let currentHead: LinkNode | null = this._head
    while (i !== index) {
      currentHead = currentHead && currentHead.next
      i++
      if (i === index) {
        return currentHead && currentHead.value
      }
    }
    return null
  }

  replace(oldValue: unknown, newValue: unknown): boolean {
    if (this._head === null) return false
    let currentHead: LinkNode | null = this._head
    while (currentHead) {
      if (currentHead.value === oldValue) {
        currentHead.value = newValue
        return true
      }
      currentHead = currentHead.next
    }
    return false
  }

  contains(value: unknown): boolean {
    if (this._head === null) return false
    let currentHead: LinkNode | null = this._head
    while (currentHead) {
      if (currentHead.value === value) return true
      currentHead = currentHead.next
    }
    return false
  }

  insertHead(value: unknown): void {
    if (this._head === null) {
      this._emptyInsert(value)
      return
    }
    this._head = new LinkNode(value, this._head)
    this._size++
    return
  }

  insertTail(value: unknown): void {
    if (this._head === null) {
      this._emptyInsert(value)
      return
    }
    if (this._tail === null) return
    this._tail.next = new LinkNode(value)
    this._tail = this._tail.next
    this._size++
  }

  insert(value: unknown, index: number): void {
    if (index < 0) throw new RangeError('Minimum index is 0.')
    const max = this.size()
    if (index > max) throw new RangeError(`Maximum index is ${max}`)
    if (index === 0) {
      this.insertHead(value)
      return
    }
    if (index === max) {
      this.insertTail(value)
      return
    }
    let i = 0
    let currentHead = this._head
    while (i !== index) {
      i++
      if (i === index) {
        if (currentHead === null) throw new Error('Impossible case')
        currentHead.next = new LinkNode(value, currentHead.next)
        this._size++
        return
      }
      currentHead = currentHead && currentHead.next
    }
  }

  removeHead(): void {
    if (this.head === null) return
  }

  private _emptyInsert(value: unknown) {
    this._head = new LinkNode(value)
    this._tail = this._head
    this._size++
  }
}
