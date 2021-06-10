import { Stack } from '../src/stack'

describe('Stack', () => {
  it('Construct a stack', () => {
    const stack = new Stack()
    expect(stack.isEmpty()).toBeTruthy()
    expect(stack.size()).toBe(0)
  })

  it('Push to stack', () => {
    const stack = new Stack()
    stack.push(12)
    expect(stack.peek()).toBe(12)
    stack.push(3)
    stack.push(4)
    expect(stack.peek()).toBe(4)
    expect(stack.size()).toBe(3)
    expect(stack.isEmpty()).toBeFalsy()
  })

  it('Pop from stack', () => {
    const stack = new Stack()
    expect(stack.pop()).toBeUndefined()
    stack.push(12)
    expect(stack.pop()).toBe(12)
    expect(stack.pop()).toBeUndefined()
    expect(stack.size()).toBe(0)
    expect(stack.isEmpty()).toBeTruthy()

    stack.push(14)
    stack.push(5)
    stack.push(3)

    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(5)
    expect(stack.size()).toBe(1)
    expect(stack.isEmpty()).toBeFalsy()

    expect(stack.pop()).toBe(14)
    expect(stack.size()).toBe(0)
    expect(stack.isEmpty()).toBeTruthy()
  })
})
