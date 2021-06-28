import { FenwickTree } from '../src/fenwickTree'

const MIN_RAND_NUM = -100
const MAX_RAND_NUM = 100

const LOOPS = 100
const UNUSED_VAL = randValue()

function randValue() {
  return Math.random() * MAX_RAND_NUM * 2 + MIN_RAND_NUM
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
})
