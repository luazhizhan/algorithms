import { SuffixArray } from './suffixArray'

class Suffix {
  // Starting position of suffix in text
  index: number
  len: number
  text: number[]

  constructor(text: number[], index: number) {
    this.len = text.length - index
    this.index = index
    this.text = text
  }

  // Compare the two suffixes inspired by Robert Sedgewick and Kevin Wayne
  compareTo(other: Suffix): number {
    if (this === other) return 0
    const min_len = Math.min(this.len, other.len)
    for (let i = 0; i < min_len; i++) {
      const currentTxt = this.text[this.index + i]
      const otherTxt = other.text[other.index + i]
      if (currentTxt === undefined || otherTxt === undefined) {
        throw new Error('Impossible case')
      }
      if (currentTxt < otherTxt) return -1
      if (currentTxt || 0 > otherTxt) return +1
    }
    return this.len - other.len
  }

  toString(): string {
    return this.text.toString() + this.index.toString() + this.len.toString()
  }
}

// Time Complexity: O(n^2log(n))

export class SuffixArraySlow extends SuffixArray {
  // Contains all the suffixes of the SuffixArray
  suffixes: Suffix[] | undefined

  constructor(text: string | number[]) {
    if (typeof text === 'string') {
      super(text.split('').map((a) => +a))
    } else {
      super(text)
    }
    this.suffixes = []
  }

  // Suffix array construction. This actually takes O(n^2log(n)) time since sorting takes on
  // average O(nlog(n)) and each String comparison takes O(n).
  protected construct(): void {
    this.sa = new Array(this.N)
    this.suffixes = new Array(this.N)

    for (let i = 0; i < this.N; i++) this.suffixes[i] = new Suffix(this.T, i)

    this.suffixes.sort((a, b) => a.compareTo(b))

    for (let i = 0; i < this.N; i++) {
      const suffix = this.suffixes[i]
      if (suffix === undefined) throw new Error('Impossible case')
      this.sa[i] = suffix.index
      delete this.suffixes[i]
    }
    this.suffixes = undefined
  }
}
