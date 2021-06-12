import { PriorityQueue, Comparator } from '../src/priorityQueue'

describe.only('PriorityQueue', () => {
  it('Construct a priority queue', () => {
    const queue = new PriorityQueue(Comparator.MIN)
    expect(queue.isEmpty()).toBeTruthy()
    expect(queue.size()).toBe(0)
  })

  it('Add to priority queue', () => {
    const queue = new PriorityQueue(Comparator.MIN)
    queue.add(2)
    expect(queue.peek()).toBe(2)
    queue.add(1)
    expect(queue.peek()).toBe(1)
    queue.add(3)
    expect(queue.peek()).toBe(1)
    expect(queue.contains(3)).toBeTruthy()
    expect(queue.size()).toBe(3)
    expect(queue.contains(4)).toBeFalsy()
    expect(queue.isEmpty()).toBeFalsy()
  })

  it('Poll from priority queue', () => {
    const queue = new PriorityQueue(Comparator.MAX)

    expect(queue.poll()).toBeUndefined()
    queue.add(1)
    expect(queue.poll()).toBe(1)
    expect(queue.peek()).toBeUndefined()

    queue.add(3)
    queue.add(3)
    queue.add(2)
    expect(queue.poll()).toBe(3)
    expect(queue.contains(3)).toBeTruthy()
    expect(queue.peek()).toBe(3)
    expect(queue.poll()).toBe(3)
    expect(queue.contains(3)).toBeFalsy()
    expect(queue.contains(2)).toBeTruthy()
    expect(queue.peek()).toBe(2)
    expect(queue.poll()).toBe(2)
    expect(queue.contains(2)).toBeFalsy()
    expect(queue.isEmpty()).toBeTruthy()

    queue.add(1)
    queue.add(3)
    queue.add(3)
    queue.add(1)
    queue.add(5)
    queue.add(3)
    queue.add(0)

    expect(queue.peek()).toBe(5)
    expect(queue.poll()).toBe(5)

    expect(queue.peek()).toBe(3)
    expect(queue.poll()).toBe(3)

    expect(queue.peek()).toBe(3)
    expect(queue.poll()).toBe(3)

    expect(queue.peek()).toBe(3)
    expect(queue.poll()).toBe(3)

    expect(queue.peek()).toBe(1)
    expect(queue.poll()).toBe(1)

    expect(queue.peek()).toBe(1)
    expect(queue.poll()).toBe(1)

    expect(queue.peek()).toBe(0)
    expect(queue.poll()).toBe(0)
  })
})
