import { Queue } from '../src/queue'

describe('Queue', () => {
  it('Construct a queue', () => {
    const queue = new Queue()
    expect(queue.isEmpty()).toBeTruthy()
    expect(queue.size()).toBe(0)
  })

  it('Offer to queue', () => {
    const queue = new Queue()
    queue.offer(12)
    expect(queue.peek()).toBe(12)
    queue.offer(3)
    queue.offer(4)
    expect(queue.peek()).toBe(12)
    expect(queue.size()).toBe(3)
    expect(queue.isEmpty()).toBeFalsy()
  })

  it('Pop from queue', () => {
    const queue = new Queue()
    expect(queue.poll()).toBeUndefined()
    queue.offer(12)
    expect(queue.poll()).toBe(12)
    expect(queue.poll()).toBeUndefined()
    expect(queue.size()).toBe(0)
    expect(queue.isEmpty()).toBeTruthy()

    queue.offer(14)
    queue.offer(5)
    queue.offer(3)

    expect(queue.peek()).toBe(14)
    expect(queue.poll()).toBe(14)
    expect(queue.peek()).toBe(5)
    expect(queue.poll()).toBe(5)
    expect(queue.size()).toBe(1)
    expect(queue.isEmpty()).toBeFalsy()

    expect(queue.poll()).toBe(3)
    expect(queue.size()).toBe(0)
    expect(queue.isEmpty()).toBeTruthy()
  })
})
