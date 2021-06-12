type Comparable = string | number

/**
 * `MIN` -> Ascending order
 *
 * `MAX` -> Descending order
 */
export const enum Comparator {
  MIN,
  MAX,
}

export class PriorityQueue<T extends Comparable> {
  private _map: { [key in T]: number[] } // { values: container index array }

  private _container: T[]

  private _comparator: Comparator

  constructor(comparator: Comparator) {
    this._container = []
    this._comparator = comparator
    this._map = {} as { [key in T]: number[] }
  }

  peek(): T | undefined {
    return this._container[0]
  }

  contains(value: T): boolean {
    return this._map[value] !== undefined
  }

  size(): number {
    return this._container.length
  }

  isEmpty(): boolean {
    return this._container.length === 0
  }

  add(value: T): void {
    const childIndex = this._container.length

    // add index to map value key
    this._map[value] = this._map[value]
      ? [...this._map[value], childIndex]
      : [childIndex]

    // add value to end of queue
    this._container.push(value)

    // update index of the new value
    this._swim(value, childIndex)
  }

  /**
   * Remove first element from queue
   */
  poll(): T | undefined {
    const size = this._container.length
    if (size === 0) return undefined

    // Get first element value
    const firstIndex = 0
    const first = this._container[firstIndex]
    if (first === undefined) return undefined // Impossible case

    // Remove first element and returns it if size is just 1
    if (size === 1) {
      this._container.splice(firstIndex, 1)
      delete this._map[first]
      return first
    }

    // Get last element value
    const lastIndex = size - 1
    const last = this._container[lastIndex]
    if (last === undefined) return undefined // Impossible case

    // update first value with last element
    // remove last element from container
    this._container.shift()
    this._container.unshift(last)
    this._container.splice(lastIndex, 1)

    // remove first element index from map
    const filtered = this._map[first].filter((a) => a !== firstIndex)
    filtered.length === 0
      ? delete this._map[first]
      : (this._map[first] = filtered)

    // Update last element index from last index to first index (0)
    this._map[last] = [
      ...this._map[last].filter((a) => a !== lastIndex),
      firstIndex,
    ]

    // update last element index
    this._sink(last, firstIndex)
    return first
  }

  private _sink(parent: T, parentIndex: number): void {
    let lChildIndex = Math.floor(2 * parentIndex + 1)
    let rChildIndex = Math.floor(2 * parentIndex + 2)
    let lChild = this._container[lChildIndex]
    let rChild = this._container[rChildIndex]

    // Switch parent node index with child node index
    const _sinkParent = (child: T, childIndex: number): void => {
      // Replace child with parent index
      this._map[child] = [
        ...this._map[child].filter((a) => a !== childIndex),
        parentIndex,
      ]

      // Replace parent with child index
      this._map[parent] = [
        ...this._map[parent].filter((a) => a !== parentIndex),
        childIndex,
      ]

      // Replace child and parent value
      this._container[parentIndex] = child
      this._container[childIndex] = parent

      // Update parent index, child indexes and values
      parentIndex = childIndex
      lChildIndex = 2 * parentIndex + 1
      rChildIndex = 2 * parentIndex + 2
      lChild = this._container[lChildIndex]
      rChild = this._container[rChildIndex]
    }

    while (
      // Not ascending order
      (this._comparator === Comparator.MIN && lChild && parent > lChild) ||
      (this._comparator === Comparator.MIN && rChild && parent > rChild) ||
      // Not descending order
      (this._comparator === Comparator.MAX && lChild && parent < lChild) ||
      (this._comparator === Comparator.MAX && rChild && parent < rChild)
    ) {
      if (this._comparator === Comparator.MIN) {
        // Always try to replace left node first
        if (lChild && parent > lChild) {
          _sinkParent(lChild, lChildIndex)
        } else if (rChild && parent > rChild) {
          _sinkParent(rChild, rChildIndex)
        }
      } else if (this._comparator === Comparator.MAX) {
        // Always try to replace left node first
        if (lChild && parent < lChild) {
          _sinkParent(lChild, lChildIndex)
        } else if (rChild && parent < rChild) {
          _sinkParent(rChild, rChildIndex)
        }
      }
    }
  }

  private _swim(child: T, childIndex: number): void {
    const _parentIndex = (_childIndex: number): number =>
      Math.floor((_childIndex - 1) / 2)
    let parentIndex = _parentIndex(childIndex)
    let parent = this._container[parentIndex]
    while (
      // Not ascending order
      (this._comparator === Comparator.MIN && parent && parent > child) ||
      // Not descending order
      (this._comparator === Comparator.MAX && parent && parent < child)
    ) {
      // Replace parent with child index
      this._map[parent] = [
        ...this._map[parent].filter((a) => a !== parentIndex),
        childIndex,
      ]

      // Replace child with parent index
      this._map[child] = [
        ...this._map[child].filter((a) => a !== childIndex),
        parentIndex,
      ]

      // Replace child and parent value
      this._container[parentIndex] = child
      this._container[childIndex] = parent

      // Update child index, parent index and value
      childIndex = parentIndex
      parentIndex = _parentIndex(childIndex)
      parent = this._container[parentIndex]
    }
  }
}
