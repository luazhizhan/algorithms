import { SuffixArray } from './suffixArray'

// Medium speed suffix array implementation. Time Complexity: O(nlog^2(n))

// Wrapper class to help sort suffix ranks
export class SuffixRankTuple {
  firstHalf = 0

  secondHalf = 0

  originalIndex = 0

  // Sort Suffix ranks first on the first half then the second half
  compareTo(other: SuffixRankTuple): number {
    const cmp =
      this.firstHalf === other.firstHalf
        ? 0
        : this.firstHalf > other.firstHalf
        ? 1
        : -1
    if (cmp === 0) {
      return this.secondHalf === other.secondHalf
        ? 0
        : this.secondHalf > other.secondHalf
        ? 1
        : -1
    }
    return cmp
  }

  toString(): string {
    return this.originalIndex + ` -> (${this.firstHalf} , ${this.secondHalf} )`
  }
}

export class SuffixArrayMed extends SuffixArray {
  constructor(text: string | number[]) {
    if (typeof text === 'string') {
      super(text.split('').map((a) => +a))
    } else {
      super(text)
    }
  }

  // Construct a suffix array in O(nlog^2(n))
  protected construct(): void {
    this.sa = new Array(this.N)

    // Maintain suffix ranks in both a matrix with two rows containing the
    // current and last rank information as well as some sortable rank objects
    let suffixRanks = Array.from(Array(2), () => new Array(this.N))
    let ranks: SuffixRankTuple[] = []
    let firstSfxRnk = suffixRanks[0]

    for (let i = 0; i < this.N; i++) {
      if (firstSfxRnk === undefined) throw new Error('Impossbile case')
      firstSfxRnk[i] = this.T[i]
      ranks[i] = new SuffixRankTuple()
    }

    // 0(log(n))
    for (let pos = 0; pos < this.N; pos *= 2) {
      for (let i = 0; i < this.N; i++) {
        const suffixRank = ranks[i]
        if (suffixRank === undefined || firstSfxRnk === undefined) {
          throw new Error('Impossbile case')
        }
        suffixRank.firstHalf = firstSfxRnk[i]
        suffixRank.secondHalf = i + pos < this.N ? firstSfxRnk[i + pos] : -1
        suffixRank.originalIndex = i
      }

      // O(nlog(n))
      ranks.sort((a, b) => a.compareTo(b))

      let newRank = 0
      const secondSfxRnk = suffixRanks[1]
      const firstRank = ranks[0]
      if (secondSfxRnk === undefined || firstRank === undefined) {
        throw new Error('Impossbile case')
      }
      secondSfxRnk[firstRank.originalIndex] = 0

      for (let i = 1; i < this.N; i++) {
        const lastSuffixRank = ranks[i - 1]
        const currSuffixRank = ranks[i]
        if (currSuffixRank === undefined || lastSuffixRank === undefined) {
          throw new Error('Impossbile case')
        }

        // If the first half differs from the second half
        if (
          currSuffixRank.firstHalf !== lastSuffixRank.firstHalf ||
          currSuffixRank.secondHalf !== lastSuffixRank.secondHalf
        )
          newRank++

        secondSfxRnk[currSuffixRank.originalIndex] = newRank
      }

      // Place top row (current row) to be the last row
      firstSfxRnk = suffixRanks[1]

      // Optimization to stop early
      if (newRank === this.N - 1) break
    }

    // Fill suffix array
    for (let i = 0; i < this.N; i++) {
      const currSuffixRank = ranks[i]
      if (currSuffixRank === undefined) throw new Error('Impossbile case')
      this.sa[i] = currSuffixRank.originalIndex
      delete ranks[i]
    }

    // Cleanup
    suffixRanks = []
    ranks = []
  }
}
