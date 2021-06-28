export class FenwickTree {
  // The size of the array holding the Fenwick tree values
  readonly N: number

  // This array contains the Fenwick tree ranges
  private tree: number[]

  constructor(sizeOrValues: number | number[]) {
    if (typeof sizeOrValues === 'number') {
      // Create an empty Fenwick Tree with 'sz' parameter zero based.
      this.tree = []
      this.N = sizeOrValues + 1
    } else {
      // Construct a Fenwick tree with an initial set of values.
      // The 'values' array MUST BE ONE BASED meaning values[0]
      // does not get used, O(n) construction.
      this.N = sizeOrValues.length
      sizeOrValues[0] = 0

      // Make a clone of the values array since we manipulate
      // the array in place destroying all its original content.
      this.tree = [...sizeOrValues]

      for (let i = 1; i < this.N; i++) {
        const p = i + FenwickTree.lsb(i)
        if (p < this.N) this.tree[p] += this.tree[i] || 0
      }
    }
  }

  // Returns the value of the least significant bit (LSB)
  // lsb(108) = lsb(0b1101100) =     0b100 = 4
  // lsb(104) = lsb(0b1101000) =    0b1000 = 8
  // lsb(96)  = lsb(0b1100000) =  0b100000 = 32
  // lsb(64)  = lsb(0b1000000) = 0b1000000 = 64
  private static lsb(i: number): number {
    // Isolates the lowest one bit value
    return i & -i
    // An alternative method is to use the Java's built in method
    // return Integer.lowestOneBit(i);
  }

  // Computes the prefix sum from [1, i], O(log(n))
  private prefixSum(i: number): number {
    let sum = 0
    while (i !== 0) {
      sum += this.tree[i] || 0
      // i &= ~FenwickTree.lsb(i); // Equivalently, i -= lsb(i);
      i &= ~FenwickTree.lsb(i)
    }
    return sum
  }

  // Returns the sum of the interval [left, right], O(log(n))
  sum(left: number, right: number): number {
    if (right < left) throw new Error('Make sure right >= left')
    return this.prefixSum(right) - this.prefixSum(left - 1)
  }

  // Get the value at index i
  get(i: number): number {
    return this.sum(i, i)
  }

  // Add 'v' to index 'i', O(log(n))
  add(i: number, v: number): void {
    while (i < this.N) {
      this.tree[i] += v
      i += FenwickTree.lsb(i)
    }
  }

  // Set index i to be equal to v, O(log(n))
  set(i: number, v: number): void {
    this.add(i, v - this.sum(i, i))
  }

  toString(): string {
    return this.tree.toString()
  }
}
