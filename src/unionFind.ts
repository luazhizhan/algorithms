export class UnionFind {
  // The number of elements in this union find
  private _size: number

  // Used to track the size of each of the component
  private _sz: number[] = []

  // id[i] points to the parent of i, if id[i] = i then i is a root node
  private _id: number[] = []

  // Tracks the number of components in the union find
  private _numComponents: number

  constructor(size: number) {
    if (size <= 0) throw new Error('Size <= 0 is not allowed')
    this._size = this._numComponents = size
    for (let i = 0; i < size; i++) {
      this._id.push(i) // Link to itself (self root)
      this._sz.push(1) // Each component is originally of size one
    }
  }

  // Find which component/set 'p' belongs to, takes amortized constant time.
  find(p: number): number {
    let root = p

    // Find the root of the component/set
    while (root !== this._id[root]) {
      const id = this._id[root]
      if (id === undefined) throw new Error('Invalid number.')
      root = id
    }

    // Compress the path leading back to the root.
    // Doing this operation is called "path compression"
    // and is what gives us amortized time complexity.
    while (p !== root) {
      const next = this._id[p]
      this._id[p] = root
      if (next === undefined) throw new Error('Impossible case.')
      p = next
    }

    return root
  }

  // This is an alternative recursive formulation for the find method
  //   find(p: number): number {
  //     const id = this._id[p] || -1
  //     if (id === -1) throw new Error('Invalid number.')
  //     if (p === id) return p
  //     return (this._id[p] = this.find(id))
  //   }

  // Return whether or not the elements 'p' and
  // 'q' are in the same components/set.
  connected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  // Return the size of the components/set 'p' belongs to
  componentSize(p: number): number | undefined {
    return this._sz[this.find(p)]
  }

  // Return the number of elements in this UnionFind/Disjoint set
  size(): number {
    return this._size
  }

  // Returns the number of remaining components/sets
  components(): number {
    return this._numComponents
  }

  // Unify the components/sets containing elements 'p' and 'q'
  unify(p: number, q: number): void {
    // These elements are already in the same group!
    if (this.connected(p, q)) return

    const root1 = this.find(p)
    const root2 = this.find(q)
    const sz1 = this._sz[root1] || -1
    const sz2 = this._sz[root2] || -1

    if (sz1 === -1 || sz2 === -1) throw new Error('Impossible case')

    // Merge smaller component/set into the larger one.
    if (sz1 < sz2) {
      this._sz[root2] += sz1
      this._id[root1] = root2
    } else {
      this._sz[root1] += sz2
      this._id[root2] = root1
    }

    // Since the roots found are different we know that the
    // number of components/sets has decreased by one
    this._numComponents--
  }
}
