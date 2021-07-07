import { SuffixArray } from './suffixArray'

export class SuffixArrayFast extends SuffixArray {
  private static DEFAULT_ALPHABET_SIZE = 256

  alphabetSize: number
  sa2: number[]
  rank: number[]
  tmp: number[]
  c: number[]

  // Designated constructor
  constructor(
    text: string | number[],
    alphabetSize = SuffixArrayFast.DEFAULT_ALPHABET_SIZE
  ) {
    if (typeof text === 'string') {
      super(text.split('').map((a) => +a))
    } else {
      super(text)
    }
    this.alphabetSize = alphabetSize
    this.sa2 = []
    this.rank = []
    this.tmp = []
    this.c = []
  }

  protected construct(): void {
    this.sa = new Array(this.N)
    this.sa2 = new Array(this.N)
    this.rank = new Array(this.N)
    this.c = new Array(Math.max(SuffixArrayFast.DEFAULT_ALPHABET_SIZE, this.N))

    let i, p, r
    for (i = 0; i < this.N; ++i) {
      const tI = this.T[i]
      if (tI === undefined) throw new Error('Impossible case')
      this.rank[i] = tI
      this.c[tI]++
    }
    for (i = 1; i < this.alphabetSize; ++i) {
      this.c[i] += this.c[i - 1] || 0
    }
    for (i = this.N - 1; i >= 0; --i) {
      const tI = this.T[i]
      if (tI === undefined) throw new Error('Impossible case')
      const cTi = --this.c[tI]
      if (cTi === undefined) throw new Error('Impossible case')
      this.sa[cTi] = i
    }
    for (p = 1; p < this.N; p <<= 1) {
      for (r = 0, i = this.N - p; i < this.N; ++i) this.sa2[r++] = i
      for (i = 0; i < this.N; ++i) {
        const saI = this.sa[i] || 0
        if (saI >= p) this.sa2[r++] = saI - p
      }
      for (let k = 0; k < this.alphabetSize; k++) this.c[k] = 0
      for (i = 0; i < this.N; ++i) {
        const rI = this.rank[i]
        if (rI === undefined) throw new Error('Impossible case')
        this.c[rI]++
      }
      for (i = 1; i < this.alphabetSize; ++i) {
        const ciMinus1 = this.c[i - 1]
        if (ciMinus1 === undefined) throw new Error('Impossible case')
        this.c[i] += ciMinus1
      }
      for (i = this.N - 1; i >= 0; --i) {
        const saI = this.sa2[i] || 0
        const rankSa = this.rank[saI] || 0
        const cRankSa = --this.c[rankSa] || 0
        this.sa[cRankSa] = this.sa2[i] as number
      }
      for (this.sa2[this.sa[0] as number] = r = 0, i = 1; i < this.N; ++i) {
        if (
          !(
            this.rank[this.sa[i - 1] as number] ===
              this.rank[this.sa[i] as number] &&
            (this.sa[i - 1] as number) + p < this.N &&
            (this.sa[i] as number) + p < this.N &&
            this.rank[(this.sa[i - 1] as number) + p] ===
              this.rank[(this.sa[i] as number) + p]
          )
        )
          r++
        this.sa2[this.sa[i] as number] = r
      }
      this.tmp = this.rank
      this.rank = this.sa2
      this.sa2 = this.tmp
      if (r === this.N - 1) break
      this.alphabetSize = r + 1
    }
  }
}
