import { FenwickTree } from '../src/fenwickTree'

const MIN_RAND_NUM = -100
const MAX_RAND_NUM = 100

//   const TEST_SZ = 100
const LOOPS = 100
const UNUSED_VAL = randValue()

function randValue() {
  return Math.random() * MAX_RAND_NUM * 2 + MIN_RAND_NUM
}

function genRandList(sz: number): number[] {
  const lst = []
  for (let i = 1; i <= sz; i++) {
    lst.push(randValue())
  }
  return lst
}

function lowBound(N: number): number {
  return Math.round(1 + Math.random() * N)
}

function highBound(low: number, N: number): number {
  return Math.min(N, low + Math.round(Math.random() * N))
}

function doRandomRangeQuery(arr: number[], ft: FenwickTree) {
  let sum = 0
  const N = arr.length - 1

  const lo = lowBound(N)
  const hi = highBound(lo, N)

  // console.log("LO: " + lo + " HI: " + hi + " N: " + N);

  for (let k = lo; k <= hi; k++) sum += arr[k] || 0

  expect(ft.sum(lo, hi)).toBe(sum)
}

describe('FenwickTreeTest', () => {
  it('Sum positive values', () => {
    const ar = [UNUSED_VAL, 1, 2, 3, 4, 5, 6]
    const ft = new FenwickTree(ar)

    expect(ft.sum(1, 6)).toBe(21)
    expect(ft.sum(1, 5)).toBe(15)
    expect(ft.sum(1, 4)).toBe(10)
    expect(ft.sum(1, 3)).toBe(6)
    expect(ft.sum(1, 2)).toBe(3)
    expect(ft.sum(1, 1)).toBe(1)

    expect(ft.sum(3, 4)).toBe(7)
    expect(ft.sum(2, 6)).toBe(20)
    expect(ft.sum(4, 5)).toBe(9)
    expect(ft.sum(6, 6)).toBe(6)
    expect(ft.sum(5, 5)).toBe(5)
    expect(ft.sum(4, 4)).toBe(4)
    expect(ft.sum(3, 3)).toBe(3)
    expect(ft.sum(2, 2)).toBe(2)
    expect(ft.sum(1, 1)).toBe(1)
  })

  it('Sum negative values', () => {
    const ar = [UNUSED_VAL, -1, -2, -3, -4, -5, -6]
    const ft = new FenwickTree(ar)

    expect(ft.sum(1, 6)).toBe(-21)
    expect(ft.sum(1, 5)).toBe(-15)
    expect(ft.sum(1, 4)).toBe(-10)
    expect(ft.sum(1, 3)).toBe(-6)
    expect(ft.sum(1, 2)).toBe(-3)
    expect(ft.sum(1, 1)).toBe(-1)

    expect(ft.sum(6, 6)).toBe(-6)
    expect(ft.sum(5, 5)).toBe(-5)
    expect(ft.sum(4, 4)).toBe(-4)
    expect(ft.sum(3, 3)).toBe(-3)
    expect(ft.sum(2, 2)).toBe(-2)
    expect(ft.sum(1, 1)).toBe(-1)
  })

  it('Sum negative values 2', () => {
    const ar = [UNUSED_VAL, -76871, -164790]
    const ft = new FenwickTree(ar)

    for (let i = 0; i < LOOPS; i++) {
      expect(ft.sum(1, 1)).toBe(-76871)
      expect(ft.sum(1, 1)).toBe(-76871)
      expect(ft.sum(1, 2)).toBe(-241661)
      expect(ft.sum(1, 2)).toBe(-241661)
      expect(ft.sum(1, 2)).toBe(-241661)
      expect(ft.sum(2, 2)).toBe(-164790)
      expect(ft.sum(2, 2)).toBe(-164790)
      expect(ft.sum(2, 2)).toBe(-164790)
    }
  })

  it.skip('Randomized static sum queires', () => {
    for (let i = 2; i <= LOOPS; i++) {
      const randList = genRandList(i)
      const ft = new FenwickTree(randList)

      for (let j = 0; j < LOOPS / 10; j++) {
        doRandomRangeQuery(randList, ft)
      }
    }
  })

  it.skip('Randomized randomized sum queires', () => {
    for (let n = 2; n <= LOOPS; n++) {
      const randList = genRandList(n)
      const ft = new FenwickTree(randList)

      for (let j = 0; j < LOOPS / 10; j++) {
        const index = 1 + Math.round(Math.random() * n)
        const rand_val = randValue()

        randList[index] += rand_val
        ft.add(index, rand_val)

        doRandomRangeQuery(randList, ft)
      }
    }
  })

  it.skip('reusability', () => {
    const SIZE = 100
    const ft = new FenwickTree(SIZE)
    const arr = []

    for (let loop = 0; loop < LOOPS; loop++) {
      for (let i = 1; i <= SIZE; i++) {
        const val = randValue()
        ft.set(i, val)
        arr[i] = val
      }
      doRandomRangeQuery(arr, ft)
    }
  })
})
