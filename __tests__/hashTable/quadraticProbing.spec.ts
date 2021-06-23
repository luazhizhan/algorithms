import { HashTableQuadraticProbing } from '../../src/hashTable/quadraticProbing'
import {
  genRandList,
  LOOPS,
  MAX_SIZE,
  HashMap,
  randInt,
  MAX_RAND_NUM,
} from './utils'

describe('HashTableQuadraticProbing', () => {
  it('Update value', () => {
    const map = new HashTableQuadraticProbing<number, number>()
    map.add(1, 1)
    expect(map.get(1)).toBe(1)

    map.add(1, 5)
    expect(map.get(1)).toBe(5)

    map.add(1, -7)
    expect(map.get(1)).toBe(-7)
  })

  // Test that as the table size increases the hashtable
  // remains as a power of two.
  it('Table size', () => {
    const loop = 1000
    const assertCapacityIsPowerOfTwo = (
      ht: HashTableQuadraticProbing<number, number>
    ) => {
      const sz = ht.getCapacity()
      if (sz === 0) return
      expect(sz & (sz - 1)).toBe(0)
    }

    for (let sz = 1; sz <= 32; sz++) {
      const ht = new HashTableQuadraticProbing<number, number>(sz)
      for (let i = 0; i < loop; i++) {
        assertCapacityIsPowerOfTwo(ht)
        ht.add(i, i)
      }
    }
  })

  it('Iterator', () => {
    const map = new HashTableQuadraticProbing<number, number>()
    let map2 = {} as HashMap
    for (let i = 0; i < LOOPS; i++) {
      map.clear()
      map2 = {} as HashMap
      expect(map.isEmpty()).toBeTruthy()

      const randNums = genRandList(MAX_SIZE)
      for (const key of randNums) {
        const value = map2[key] === undefined ? null : map2[key]
        map2[key] = key
        expect(map.add(key, key)).toBe(value)
      }

      for (const key of map) {
        expect(map.get(key)).toBe(key)
        expect(map.get(key)).toBe(map2[key])
        expect(map.hasKey(key)).toBeTruthy()
        expect(randNums.includes(key)).toBeTruthy()
      }

      for (const key in map2) {
        const numKey = Number.parseInt(key)
        expect(map.get(numKey)).toBe(numKey)
      }

      // count of unique bucket index
      const set = new Set()
      for (const n of randNums) set.add(n)

      expect(set.size).toBe(map.keys().length)
      expect(Object.keys(map2).length).toBe(map.keys().length)
    }
  })

  it('Remove', () => {
    const map = new HashTableQuadraticProbing<number, number>()

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

  it('Complex remove', () => {
    const map = new HashTableQuadraticProbing<{ 88: number }, number>()
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

  it('Random remove', () => {
    const map = new HashTableQuadraticProbing<number, number>()
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

  it('Random map operation', () => {
    let jmap = {} as HashMap
    const map = new HashTableQuadraticProbing<number, number>()
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

  it('Random iterator', () => {
    let map = new HashTableQuadraticProbing<number, number[]>()
    let hmap = {} as HashMap
    for (let loop = 0; loop < LOOPS; loop++) {
      map.clear()
      hmap = {}
      expect(map.size()).toBe(Object.keys(hmap).length)

      const sz = randInt(1, MAX_SIZE)
      map = new HashTableQuadraticProbing<number, number[]>(sz)
      const probability = Math.random()
      for (let i = 0; i < MAX_SIZE; i++) {
        const index = randInt(0, MAX_SIZE - 1)
        let l1 = map.get(index) as number[] | undefined
        let l2 = hmap[index] as number[] | undefined

        if (l1 === undefined || l2 === undefined) {
          l1 = []
          l2 = []
          map.put(index, l1)
          hmap[index] = l2
        }
        const randVal = randInt(-MAX_SIZE, MAX_SIZE)
        if (Math.random() < probability) {
          l1.filter((a) => a !== randVal)
          l2.filter((a) => a !== randVal)
        } else {
          l1.push(randVal)
          l2.push(randVal)
        }

        expect(Object.keys(hmap).length).toBe(map.size())
        expect(l1).toEqual(l2)
      }
    }
  })

  it('Illegal creation', () => {
    expect(
      () => new HashTableQuadraticProbing<number, number>(-3, 0.5)
    ).toThrowError()
    expect(
      () =>
        new HashTableQuadraticProbing<number, number>(
          5,
          Number.POSITIVE_INFINITY
        )
    ).toThrowError()
    expect(
      () => new HashTableQuadraticProbing<number, number>(6, -0.5)
    ).toThrowError()
  })
})
