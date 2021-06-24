import { SecondaryHash } from './secondaryHash'
import { hashCode } from './utils'

export class DoubleHashingTestObject implements SecondaryHash {
  private hash = 0
  private hash2 = 0

  intData: number | null = null

  vectorData: number[] | null = null

  stringData = ''

  static randomVector: number[]

  static R = Math.random()

  static MAX_VECTOR_SIZE = 1000

  static(): void {
    for (let i = 0; i < DoubleHashingTestObject.MAX_VECTOR_SIZE; i++) {
      DoubleHashingTestObject.R = Math.random()
      let val = DoubleHashingTestObject.R
      while (val % 2 === 0) {
        DoubleHashingTestObject.R = Math.random()
        val = DoubleHashingTestObject.R
      }
      DoubleHashingTestObject.randomVector[i] = val
    }
  }

  constructor(data: number | number[] | string) {
    if (typeof data === 'number') {
      this.intData = data
      this.intHash()
    } else if (typeof data === 'string') {
      this.stringData = data
      this.stringHash()
    } else {
      this.vectorData = data
      this.vectorHash()
    }
    this.computeHash()
  }

  private vectorHash(): void {
    if (this.vectorData === null) return
    for (let i = 0; i < this.vectorData.length; i++) {
      const ranVec = DoubleHashingTestObject.randomVector[i]
      const vectData = this.vectorData[i]
      if (ranVec !== undefined && vectData !== undefined) {
        this.hash2 += ranVec * vectData
      }
    }
  }

  private stringHash(): void {
    // Multipicative hash function:
    const INITIAL_VALUE = 0
    const prime = 17
    let power = 1
    this.hash = INITIAL_VALUE
    for (let i = 0; i < this.stringData.length; i++) {
      // Get ASCII value
      const ch = this.stringData.charCodeAt(i)
      this.hash2 += power * ch
      power *= prime
    }
  }

  private intHash(): void {
    if (this.intData === null) return
    this.hash2 = this.intData
  }

  private computeHash(): void {
    if (this.intData !== null) this.hash = hashCode(this.intData)
    else if (this.stringData !== null) this.hash = hashCode(this.stringData)
    else this.hash = hashCode(this.vectorData)
  }

  _hashCode(): number {
    return this.hash
  }

  _hashCode2(): number {
    return this.hash2
  }

  equals(o: DoubleHashingTestObject): boolean {
    if (this.hash !== o.hash) return false
    if (this.intData !== null) return this.intData === o.intData
    if (this.vectorData !== null && o.vectorData !== null) {
      const vectorData = this.vectorData
      const oVectorData = o.vectorData
      return (
        vectorData.length === oVectorData.length &&
        vectorData.every((value, index) => value === oVectorData[index])
      )
    }
    return this.stringData === o.stringData
  }
}
