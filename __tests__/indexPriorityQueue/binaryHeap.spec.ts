import { BinaryHeap } from '../../src/indexPriorityQueue/binaryHeap'
// import { shuffle } from '../hashTable/utils'

describe('Indexed Binary Heap', () => {
  it('Contains valid key', () => {
    const pq = new BinaryHeap<string>(10)
    pq.insert(5, 'abcdef')
    expect(pq.contains(5)).toBeTruthy()
    expect(pq.contains(3)).toBeFalsy()
  })

  it('Update key value', () => {
    const pq = new BinaryHeap<string>(10)
    pq.insert(5, 'abcdef')
    pq.update(5, 'xyz')
    expect(pq.valueOf(5)).toBe('xyz')
  })

  it('Decrease key', () => {
    const pq = new BinaryHeap<number>(10)
    pq.insert(3, 5)
    pq.decrease(3, 4)
    expect(pq.valueOf(3)).toBe(4)
  })

  it('Decrease key no update', () => {
    const pq = new BinaryHeap<number>(10)
    pq.insert(3, 5)
    pq.decrease(3, 6)
    expect(pq.valueOf(3)).toBe(5)
  })

  it('increase key', () => {
    const pq = new BinaryHeap<number>(10)
    pq.insert(3, 4)
    pq.increase(3, 5)
    expect(pq.valueOf(3)).toBe(5)
  })

  it('increase key no update', () => {
    const pq = new BinaryHeap<number>(10)
    pq.insert(3, 4)
    pq.increase(3, 3)
    expect(pq.valueOf(3)).toBe(4)
  })

  it('Peek And Poll Min Index', () => {
    const pairs = [
      [4, 1],
      [7, 5],
      [1, 6],
      [5, 8],
      [3, 7],
      [6, 9],
      [8, 0],
      [2, 4],
      [9, 3],
      [0, 2],
    ]
    sortPairsByValue(pairs)

    const n = pairs.length
    const pq = new BinaryHeap<number>(n)
    for (let i = 0; i < n; i++) {
      const pairI = pairs[i] as number[]
      pq.insert(pairI[0] as number, pairI[1] as number)
    }

    // let minIndex
    // for (let i = 0; i < n; i++) {
    // //   minIndex = pq.peekMinKeyIndex()
    // //   const pairI = pairs[i] as number[]
    // //   expect(minIndex).toBe(pairI[0] as number)
    // //   minIndex = pq.pollMinKeyIndex()
    // //   expect(minIndex).toBe(pairI[0] as number)
    // }
  })

  it('Duplicate key', () => {
    const pq = new BinaryHeap<string>(10)
    pq.insert(5, 'abcdef')
    expect(() => pq.insert(5, 'xyz')).toThrowError()
  })

  it('Errors', () => {
    expect(() => new BinaryHeap<string>(-1)).toThrowError()
    expect(() => new BinaryHeap<string>(0)).toThrowError()
  })
})

function sortPairsByValue(pairs: number[][]) {
  return pairs.sort((a, b) => (a[1] as number) - (b[1] as number))
}

// function genUniqueRandList(sz: number) {
//   const lst = new Array<number>(sz)
//   for (let i = 0; i < sz; i++) lst.push(i)
//   shuffle(lst)
//   return lst
// }
