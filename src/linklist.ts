class LinkNode {
  value: unknown
  next: LinkNode | null

  constructor(value: unknown, next: LinkNode | null = null) {
    this.value = value
    this.next = next
  }
}

export class LinkList implements Iterable<unknown> {
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

  clear(): void {
    this._head = null
    this._tail = null
    this._size = 0
  }

  isEmpty(): boolean {
    return this._size === 0
  }

  get(index: number): unknown {
    if (index < 0) throw new RangeError('Minimum index is 0.')
    const max = this.size() - 1
    if (index > max) throw new RangeError(`Maximum index is ${max}`)
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
    return
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

  addFirst(value: unknown): void {
    if (this._head === null) {
      this._emptyInsert(value)
      return
    }
    this._head = new LinkNode(value, this._head)
    this._size++
    return
  }

  addTail(value: unknown): void {
    if (this._head === null) {
      this._emptyInsert(value)
      return
    }
    if (this._tail === null) return
    let headHolder = this._head
    while (headHolder.next) {
      headHolder = headHolder.next
    }
    const newTail = new LinkNode(value)
    headHolder.next = newTail
    this._tail = newTail
    this._size++
  }

  add(value: unknown): void {
    this.addAt(value, this._size)
  }

  addAt(value: unknown, index: number): void {
    if (index < 0) throw new RangeError('Minimum index is 0.')
    const max = this.size()
    if (index > max) throw new RangeError(`Maximum index is ${max}`)
    if (index === 0) {
      this.addFirst(value)
      return
    }
    if (index === max) {
      this.addTail(value)
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

  removeFirst(): void {
    if (this._head === null) return
    switch (this._size) {
      case 1:
        this._head = null
        this._tail = null
        break
      case 2:
        this._head = this._tail
        this._tail = this._head
        break
      default:
        this._head = this._head.next
        break
    }
    this._size--
    return
  }

  removeLast(): void {
    if (this._head === null) return
    switch (this._size) {
      case 1:
        this._head = null
        this._tail = null
        break
      case 2:
        this._tail = this._head
        this._head = this._tail
        break
      default: {
        let newTail = this._head
        while (newTail.next && newTail.next.next) {
          newTail = newTail.next
        }
        newTail.next = null
        this._tail = newTail
        break
      }
    }
    this._size--
    return
  }

  remove(index: number): void {
    if (index < 0) throw new RangeError('Minimum index is 0.')
    const max = this.size() - 1
    if (index > max) throw new RangeError(`Maximum index is ${max}`)
    if (index === 0) {
      this.removeFirst()
      return
    }
    if (index === max) {
      this.removeLast()
      return
    }
    let i = 0
    let currentHead = this._head
    if (currentHead === null) return // impossible case
    while (i < index - 1) {
      if (currentHead === null || currentHead.next === null) break
      currentHead = currentHead.next
      i++
    }
    currentHead.next = currentHead.next && currentHead.next.next
    this._size--
    return
  }

  reverse(): void {
    let current = this._head
    let next = null
    let prev = null

    // set head to tail
    this._tail = new LinkNode(this._head?.value)

    while (current !== null) {
      next = current.next
      current.next = prev
      prev = current
      current = next
    }
    this._head = prev
  }

  [Symbol.iterator](): Iterator<unknown> {
    let current = this._head
    return {
      next: () => {
        {
          if (current === null) return { value: undefined, done: true }
          const value = current.value
          current = current.next
          return { value, done: false }
        }
      },
    }
  }

  private _emptyInsert(value: unknown) {
    this._head = new LinkNode(value)
    this._tail = this._head
    this._size++
  }
}
