import { HashTableSeparateChaining } from '../../src/hashTable/seperateChaining'
import { genRandList, MAX_RAND_NUM, randInt, LOOPS, MAX_SIZE } from './utils'

type HashMap = { [key in string]: unknown }

describe('HashTableSeparateChaining', () => {
  it('Illegal creation', () => {
    expect(() => new HashTableSeparateChaining(-3, 0.5)).toThrowError()
    expect(
      () => new HashTableSeparateChaining(5, Number.POSITIVE_INFINITY)
    ).toThrowError()
    expect(() => new HashTableSeparateChaining(6, -0.5)).toThrowError()
  })

  it('Update value', () => {
    const map = new HashTableSeparateChaining<number, number>(6, 0.9)
    map.add(1, 1)
    expect(map.get(1)).toBe(1)

    map.add(1, 5)
    expect(map.get(1)).toBe(5)

    map.add(1, -7)
    expect(map.get(1)).toBe(-7)
  })

  it('Remove', () => {
    const map = new HashTableSeparateChaining<number, number>()

    // add 3 elements
    map.put(11, 0)
    map.put(12, 0)
    map.put(13, 0)
    expect(map.size()).toBe(3)

    // Add ten more
    for (let i = 1; i <= 10; i++) map.put(i, 0)
    expect(map.size()).toBe(13)

    // Remove 10
    for (let i = 1; i <= 10; i++) map.remove(i)
    expect(map.size()).toBe(3)

    // Remove 3
    map.remove(11)
    map.remove(12)
    map.remove(13)
    expect(map.size()).toBe(0)
  })

  it('Random remove', () => {
    const map = new HashTableSeparateChaining<number, number>()
    for (let loop = 0; loop < LOOPS; loop++) {
      map.clear()

      // Add some random values
      const keySet = {} as HashMap
      for (let i = 0; i < MAX_SIZE; i++) {
        const randomVal = randInt(-MAX_RAND_NUM, MAX_RAND_NUM)
        keySet[randomVal] = randomVal
        map.put(randomVal, 5)
      }

      expect(map.size()).toBe(Object.keys(keySet).length)

      const keys = map.keys()
      for (const key of keys) map.remove(key)
      expect(map.isEmpty()).toBeTruthy()
    }
  })

  it('Complex remove', () => {
    const map = new HashTableSeparateChaining<{ 88: number }, number>()
    const o1 = { 88: 1 }
    const o2 = { 88: 2 }
    const o3 = { 88: 3 }
    const o4 = { 88: 4 }
    map.add(o1, 111)
    map.add(o2, 111)
    map.add(o3, 111)
    map.add(o4, 111)

    map.remove(o2)
    map.remove(o3)
    map.remove(o1)
    map.remove(o4)

    expect(map.size()).toBe(0)
  })

  it('Random map operation', () => {
    let jmap = {} as HashMap
    const map = new HashTableSeparateChaining<number, number>()
    for (let loop = 0; loop < LOOPS; loop++) {
      map.clear()
      jmap = {}
      expect(map.size()).toBe(Object.keys(jmap).length)

      const probability1 = Math.random()
      const probability2 = Math.random()

      const nums = genRandList(MAX_SIZE)
      for (let i = 0; i < MAX_SIZE; i++) {
        const r = Math.random()
        const key = nums[i] || 0
        const val = i
        if (r < probability1) {
          const value = jmap[key] === undefined ? null : jmap[key]
          jmap[key] = val
          expect(map.add(key, val)).toBe(value)
        }

        expect(jmap[key] === undefined ? null : jmap[key]).toBe(map.get(key))
        expect(jmap[key] !== undefined).toBe(map.containsKey(key))
        expect(Object.keys(jmap).length).toBe(map.size())

        if (r > probability2) {
          const jVal = jmap[key] === undefined ? null : jmap[key]
          delete jmap[key]
          expect(map.remove(key)).toBe(jVal)
        }

        expect(jmap[key] === undefined ? null : jmap[key]).toBe(map.get(key))
        expect(jmap[key] !== undefined).toBe(map.containsKey(key))
        expect(Object.keys(jmap).length).toBe(map.size())
      }
    }
  })

  it('Interator', () => {
    const map = new HashTableSeparateChaining<number, number>()
    let map2 = {} as HashMap
    for (let loop = 0; loop < LOOPS; loop++) {
      map.clear()
      map2 = {} as HashMap
      expect(map.isEmpty()).toBeTruthy()

      const randNums = genRandList(MAX_SIZE)
      for (const key of randNums) {
        const value = map2[key] === undefined ? null : map2[key]
        map2[key] = key
        expect(map.add(key, key)).toBe(value)
      }

      let count = 0
      for (const key of map) {
        expect(map.get(key)).toBe(key)
        expect(map.get(key)).toBe(map2[key])
        expect(map.hasKey(key)).toBeTruthy()
        expect(randNums.includes(key)).toBeTruthy()
        count++
      }

      for (const key in map2) {
        const numKey = Number.parseInt(key)
        expect(map.get(numKey)).toBe(numKey)
      }

      // count of unique bucket index
      const set = new Set()
      for (const n of randNums) set.add(n)

      expect(set.size).toBe(count)
      expect(Object.keys(map2).length).toBe(count)
    }
  })
})
