export abstract class SuffixArray {
  // Length of the suffix array
  protected N: number

  // T is the text
  protected T: number[]

  // The sorted suffix array values.
  protected sa: number[]

  // Longest Common Prefix array
  protected lcp: number[]

  private constructedSa = false

  private constructedLcpArray = false

  constructor(text: number[]) {
    this.T = text
    this.N = text.length
    this.sa = []
    this.lcp = []
  }

  textLength(): number {
    return this.T.length
  }

  // Returns the suffix array.
  getSa(): number[] {
    this.buildSuffixArray()
    return this.sa
  }

  // Returns the LCP array.
  getLcpArray(): number[] {
    this.buildLcpArray()
    return this.lcp
  }

  // Builds the suffix array by calling the construct() method.
  protected buildSuffixArray(): void {
    if (this.constructedSa) return
    this.construct()
    this.constructedSa = true
  }

  // Builds the LCP array by first creating the SA and then running the kasai algorithm.
  protected buildLcpArray(): void {
    if (this.constructedLcpArray) return
    this.buildSuffixArray()
    this.kasai()
    this.constructedLcpArray = true
  }

  // The suffix array construction algorithm is left undefined
  // as there are multiple ways to do this.
  protected abstract construct(): void

  // Use Kasai algorithm to build LCP array
  // http://www.mi.fu-berlin.de/wiki/pub/ABI/RnaSeqP4/suffix-array.pdf
  private kasai(): void {
    this.lcp = new Array(this.N)
    const inv = new Array(this.N)
    for (let i = 0; i < this.N; i++) inv[this.sa[i] || 0] = i
    for (let i = 0, len = 0; i < this.N; i++) {
      if (inv[i] > 0) {
        const k = this.sa[inv[i] - 1] || 0
        while (
          i + len < this.N &&
          k + len < this.N &&
          this.T[i + len] === this.T[k + len]
        ) {
          len++
        }
        this.lcp[inv[i]] = len
        if (len > 0) len--
      }
    }
  }
}
