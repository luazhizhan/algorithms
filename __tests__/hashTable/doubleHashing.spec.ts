import { HashTableDoubleHashing } from '../../src/hashTable/doubleHashing'
import { DoubleHashingTestObject } from '../../src/hashTable/doubleHashingTestObject'
import {
  HashMap,
  LOOPS,
  MAX_RAND_NUM,
  MAX_SIZE,
  randInt,
  shuffle,
} from './utils'

describe('HashTableDoubleHashing', () => {
  it('Update value', () => {
    const o1 = new DoubleHashingTestObject(1)
    const o5 = new DoubleHashingTestObject(5)
    const on7 = new DoubleHashingTestObject(-7)
    const map = new HashTableDoubleHashing<DoubleHashingTestObject, number>()

    map.add(o1, 1)
    expect(map.get(o1)).toBe(1)

    map.add(o5, 5)
    expect(map.get(o5)).toBe(5)

    map.add(on7, -7)
    expect(map.get(on7)).toBe(-7)
  })

  it('Remove', () => {
    const map = new HashTableDoubleHashing<DoubleHashingTestObject, number>(7)

    const o1 = new DoubleHashingTestObject(11)
    const o2 = new DoubleHashingTestObject(12)
    const o3 = new DoubleHashingTestObject(13)

    // add 3 elements
    map.put(o1, 0)
    map.put(o2, 0)
    map.put(o3, 0)
    expect(map.size()).toBe(3)

    // Add ten more
    for (let i = 1; i <= 10; i++) map.put(new DoubleHashingTestObject(i), 0)
    expect(map.size()).toBe(13)

    // Remove 10
    for (let i = 1; i <= 10; i++) map.remove(new DoubleHashingTestObject(i))
    expect(map.size()).toBe(3)

    // Remove 3
    map.remove(o1)
    map.remove(o2)
    map.remove(o3)
    expect(map.size()).toBe(0)
  })

  it('Remove Random', () => {
    const map = new HashTableDoubleHashing<DoubleHashingTestObject, number>()
    for (let i = 0; i < LOOPS; i++) {
      map.clear()
      const keySet = {} as HashMap
      for (let i = 0; i < MAX_SIZE; i++) {
        const randomVal = randInt(-MAX_RAND_NUM, MAX_RAND_NUM)
        const obj = new DoubleHashingTestObject(randomVal)
        keySet[obj._hashCode2()] = obj
        map.put(obj, 5)
      }

      expect(map.size()).toBe(Object.keys(keySet).length)

      const keys = map.keys()
      for (const key of keys) map.remove(key)
      expect(map.isEmpty()).toBeTruthy()
    }
  })

  it('Random map operation', () => {
    let jmap = {} as HashMap
    const map = new HashTableDoubleHashing<DoubleHashingTestObject, number>()
    for (let loop = 0; loop < LOOPS; loop++) {
      map.clear()
      jmap = {}
      expect(map.size()).toBe(Object.keys(jmap).length)

      const probability1 = Math.random()
      const probability2 = Math.random()

      const objs = genRandList(MAX_SIZE)
      for (let i = 0; i < MAX_SIZE; i++) {
        const r = Math.random()
        const key = objs[i] as DoubleHashingTestObject
        const val = i
        if (r < probability1) {
          const value =
            jmap[key._hashCode2()] === undefined ? null : jmap[key._hashCode2()]
          jmap[key._hashCode2()] = val
          expect(map.add(key, val)).toBe(value)
        }

        expect(
          jmap[key._hashCode2()] === undefined ? null : jmap[key._hashCode2()]
        ).toBe(map.get(key))
        expect(jmap[key._hashCode2()] !== undefined).toBe(map.containsKey(key))
        expect(Object.keys(jmap).length).toBe(map.size())

        if (r > probability2) {
          const jVal =
            jmap[key._hashCode2()] === undefined ? null : jmap[key._hashCode2()]
          delete jmap[key._hashCode2()]
          expect(map.remove(key)).toBe(jVal)
        }

        expect(
          jmap[key._hashCode2()] === undefined ? null : jmap[key._hashCode2()]
        ).toBe(map.get(key))
        expect(jmap[key._hashCode2()] !== undefined).toBe(map.containsKey(key))
        expect(Object.keys(jmap).length).toBe(map.size())
      }
    }
  })

  it('Iterator', () => {
    const map = new HashTableDoubleHashing<
      DoubleHashingTestObject,
      DoubleHashingTestObject
    >()
    let map2 = {} as HashMap
    for (let i = 0; i < LOOPS; i++) {
      map.clear()
      map2 = {} as HashMap
      expect(map.isEmpty()).toBeTruthy()

      const randObjs = genRandList(MAX_SIZE)
      for (const key of randObjs) {
        const value =
          map2[key._hashCode2()] === undefined ? null : map2[key._hashCode2()]
        map2[key._hashCode2()] = key
        expect(map.add(key, key)).toBe(value)
      }

      for (const key of map) {
        expect(map.get(key)).toEqual(key)
        expect(map.get(key)).toBe(map2[key._hashCode2()])
        expect(map.hasKey(key)).toBeTruthy()
        expect(randObjs.includes(key)).toBeTruthy()
      }

      for (const key in map2) {
        const keyy = map2[key] as DoubleHashingTestObject
        expect(map.get(keyy)).toBe(keyy)
      }

      // count of unique bucket index
      const set = new Set()
      for (const obj of randObjs) set.add(obj._hashCode2())

      expect(set.size).toBe(map.keys().length)
      expect(Object.keys(map2).length).toBe(map.keys().length)
    }
  })

  it('Random iterator', () => {
    let map = new HashTableDoubleHashing<DoubleHashingTestObject, number[]>()
    let hmap = {} as HashMap
    for (let loop = 0; loop < LOOPS; loop++) {
      map.clear()
      hmap = {}
      expect(map.size()).toBe(Object.keys(hmap).length)

      const sz = randInt(1, MAX_SIZE)
      map = new HashTableDoubleHashing<DoubleHashingTestObject, number[]>(sz)
      const probability = Math.random()
      for (let i = 0; i < MAX_SIZE; i++) {
        const keyValue = randInt(0, MAX_SIZE - 1)
        const index = new DoubleHashingTestObject(keyValue)
        let l1 = map.get(index) as number[] | null
        let l2 = hmap[index._hashCode2()] as number[] | undefined

        if (l1 === null || l2 === undefined) {
          l1 = []
          l2 = []
          map.put(index, l1)
          hmap[index._hashCode2()] = l2
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
      () => new HashTableDoubleHashing<DoubleHashingTestObject, number>(-3, 0.5)
    ).toThrowError()
    expect(
      () =>
        new HashTableDoubleHashing<DoubleHashingTestObject, number>(
          5,
          Number.POSITIVE_INFINITY
        )
    ).toThrowError()
    expect(
      () => new HashTableDoubleHashing<DoubleHashingTestObject, number>(6, -0.5)
    ).toThrowError()
  })
})

function genRandList(sz: number): DoubleHashingTestObject[] {
  const lst = []
  for (let i = 0; i < sz; i++) {
    const int = randInt(-MAX_RAND_NUM, MAX_RAND_NUM)
    const obj = new DoubleHashingTestObject(int)
    lst.push(obj)
  }
  shuffle<DoubleHashingTestObject>(lst)
  return lst
}
