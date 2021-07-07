import { SuffixArraySlow } from '../src/suffixArray/suffixArraySlow'
import { SuffixArrayMed } from '../src/suffixArray/suffixArrayMed'
import { SuffixArrayFast } from '../src/suffixArray/suffixArrayFast'

describe('Suffix Array', () => {
  const ASCII_LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  it('Suffix array length', () => {
    const str = 'ABCDE'
    const sa1 = new SuffixArraySlow(str)
    const sa2 = new SuffixArrayMed(str)
    const sa3 = new SuffixArrayFast(str)

    expect(sa1.getSa().length).toBe(str.length)
    expect(sa2.getSa().length).toBe(str.length)
    expect(sa3.getSa().length).toBe(str.length)
  })

  it('LSC unique characters', () => {
    const sa1 = new SuffixArraySlow(ASCII_LETTERS)
    const sa2 = new SuffixArrayMed(ASCII_LETTERS)
    const sa3 = new SuffixArrayFast(ASCII_LETTERS)

    const suffixArrays = [sa1, sa2, sa3]
    for (const sa of suffixArrays) {
      for (let i = 0; i < sa.getSa().length; i++) {
        expect(sa.getLcpArray()[i] || 0).toBe(0)
      }
    }
  })

  it('Increasing LCP test', () => {
    const UNIQUE_CHARS = 'KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK'
    const sa1 = new SuffixArraySlow(UNIQUE_CHARS)
    const sa2 = new SuffixArrayMed(UNIQUE_CHARS)
    const sa3 = new SuffixArrayFast(UNIQUE_CHARS)

    const suffixArrays = [sa1, sa2, sa3]
    for (const sa of suffixArrays) {
      for (let i = 0; i < sa.getSa().length; i++) {
        expect(sa.getLcpArray()[i] || i).toBe(i)
      }
    }
  })
})
