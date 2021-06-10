import { MyArray } from '../src/array'

describe('Array', () => {
  it('Push value to array', () => {
    const arr = new MyArray(1)
    expect(arr.isEmpty()).toBeTruthy()
    arr.push('a')
    arr.push('b')
    expect(arr.length()).toBe(2)
    expect(arr.isEmpty()).toBeFalsy()
    expect(arr.get(0)).toBe('a')
    expect(arr.get(1)).toBe('b')
    expect(() => arr.get(-1)).toThrowError(RangeError)
    expect(() => arr.get(2)).toThrowError(RangeError)
    arr.clear()
    expect(arr.isEmpty()).toBeTruthy()
  })

  it('Unshift value to array', () => {
    const arr = new MyArray(1)
    arr.unshift('a')
    arr.unshift('b')
    expect(arr.length()).toBe(2)
    expect(arr.get(0)).toBe('b')
    expect(arr.get(1)).toBe('a')
    expect(() => arr.get(2)).toThrowError(RangeError)
  })

  it('Pop value from array', () => {
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

  it('Shift value from array', () => {
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

  it('Remove value from array by index', () => {
    const arr = new MyArray(1)
    arr.push('a')
    expect(() => arr.removeAt(2)).toThrowError(RangeError)
    arr.removeAt(0)
    expect(arr.length()).toBe(0)
    expect(arr.isEmpty()).toBeTruthy()
    arr.push('a')
    arr.push('b')
    arr.push('c')
    arr.removeAt(2)
    expect(arr.length()).toBe(2)
    expect(arr.get(1)).toBe('b')
  })

  it('Get index of value in array', () => {
    const arr = new MyArray(1)
    expect(arr.indexOf('a')).toBe(-1)
    arr.push('a')
    expect(arr.indexOf('b')).toBe(-1)
    expect(arr.contains('b')).toBeFalsy()
    expect(arr.indexOf('a')).toBe(0)
    expect(arr.contains('a')).toBeTruthy()
    arr.push('b')
    arr.push('c')
    expect(arr.indexOf('b')).toBe(1)
    expect(arr.contains('b')).toBeTruthy()
    expect(arr.indexOf('c')).toBe(2)
    expect(arr.contains('c')).toBeTruthy()
  })

  it('Interate array', () => {
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
})
