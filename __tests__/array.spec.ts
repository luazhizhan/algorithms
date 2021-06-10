import { MyArray } from '../src/array'

test('Push value to array', () => {
  const arr = new MyArray(1)
  arr.push('a')
  arr.push('b')
  expect(arr.length()).toBe(2)
  expect(arr.get(0)).toBe('a')
  expect(arr.get(1)).toBe('b')
  expect(() => arr.get(-1)).toThrowError(RangeError)
  expect(() => arr.get(2)).toThrowError(RangeError)
})

test('Unshift value to array', () => {
  const arr = new MyArray(1)
  arr.unshift('a')
  arr.unshift('b')
  expect(arr.length()).toBe(2)
  expect(arr.get(0)).toBe('b')
  expect(arr.get(1)).toBe('a')
  expect(() => arr.get(2)).toThrowError(RangeError)
})

test('Pop value from array', () => {
  const arr = new MyArray(2)
  arr.push('a')
  arr.push('b')
  arr.push('c')

  expect(arr.length()).toBe(3)
  expect(arr.pop()).toBe('c')
  expect(arr.pop()).toBe('b')
  expect(arr.pop()).toBe('a')
  expect(arr.pop()).toBeUndefined()
  expect(arr.length()).toBe(0)
})

test('Shift value from array', () => {
  const arr = new MyArray(2)
  arr.unshift('a')
  arr.unshift('b')
  arr.unshift('c')

  expect(arr.length()).toBe(3)
  expect(arr.shift()).toBe('c')
  expect(arr.shift()).toBe('b')
  expect(arr.shift()).toBe('a')
  expect(arr.shift()).toBeUndefined()
  expect(arr.length()).toBe(0)
})

test('Interate from array', () => {
  const arr = new MyArray(2)
  arr.unshift('a')
  arr.unshift('b')
  arr.unshift('c')
  const values = []
  for (const v of arr) {
    values.push(v)
  }
  expect(values).toEqual(['c', 'b', 'a'])
})
